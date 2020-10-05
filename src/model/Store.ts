import { Project } from "./Project";
import {
  types,
  Instance,
  clone,
  getType,
  isStateTreeNode,
  getRoot,
  IAnyStateTreeNode,
} from "mobx-state-tree";
import { generateId } from "../utils/generateId";
import { createContext, useContext } from "react";
import { IFnIn, IFn, Fn } from "./Fn";
import { IPoint } from "./Point";
import { coreFunctions, coreFunctionProcesses } from "./CoreFunctions";
import { IPath, Path } from "./Path";
import { IWire } from "./Wire";
import { Token, IToken } from "./Token";
import { coreTypes } from "./CoreTypes";
import { ITypeIn } from "./Type";
import { ISocket } from "./Sockets";
import { IKeyValueMap } from "mobx";
import { assocPath, mergeDeepLeft, path } from "ramda";
import { IPlug } from "./Plug";

const RunTimeViewMode = types.enumeration("runTimeViewMode", [
  "docked",
  "window",
  "max",
]);

type IRunTimeViewMode = Instance<typeof RunTimeViewMode>;

export const Store = types
  .model("store", {
    project: Project,
    activeFunction: types.reference(Fn),
    activeDrag: types.maybe(Path),
    activeSocket: types.maybe(Path),
    runTimeViewMode: RunTimeViewMode,
    functionContext: types.maybe(types.reference(Token)),
    appState: types.optional(types.frozen(), {
      input: {
        keysDown: [],
      },
      state: {},
    }),
  })
  .views((self) => ({
    get runtimeValue() {
      return calculateFunction(self.project.mainFn, self.appState);
    },

    get runtimeOutput() {
      return mapOutputToValues(self.project.mainFn.sockets, this.runtimeValue);
    },
  }))
  .actions((self) => ({
    activeDragPlug(drag: IPath) {
      self.activeDrag = clone(drag);
    },
    startDrag(drag: IPath) {
      if (isStateTreeNode(drag)) {
        self.activeDrag = clone(drag);
      } else {
        self.activeDrag = drag;
      }
    },
    stopDrag() {
      if (self.activeDrag) {
        if (self.activeSocket) {
          const index = self.activeFunction.wires.findIndex(
            (i: any) => i.to.path === self.activeSocket?.path
          );

          self.activeSocket.target.removeValue(self.activeSocket.path);

          if (index > -1) {
            self.activeFunction.wires[index].to = clone(self.activeSocket);
          } else {
            self.activeFunction.wires.push({
              id: self.activeSocket.path,
              from: clone(self.activeDrag),
              to: clone(self.activeSocket),
            });
          }
        } else {
          // if dropped on background remove wire
          const activeWireIndex = self.activeFunction.wires.findIndex(
            (i: any) => i.to.path === self.activeDrag?.path
          );
          if (activeWireIndex > -1) {
            self.activeFunction.wires.splice(activeWireIndex, 1);
          }
        }
      }

      self.activeDrag = undefined;
    },
    setActiveFunction(fn: IFn | undefined) {
      self.activeFunction = fn || self.project.mainFn;
    },
    setActiveSocket(param: IPath | undefined) {
      self.activeSocket = param;
    },
    setFunctionContext(param: IToken | undefined) {
      self.functionContext = param;
    },
    createNewFunction(position: IPoint, name: string) {
      const newFn: IFnIn = {
        id: generateId(),
        core: false,
        name,
        input: [],
        output: [],
      };

      self.project.functions.put(newFn);
      const f = self.project.functions.get(newFn.id);
      if (f) {
        self.activeFunction?.addToken(position, f);
      }
    },
    setRunTimeViewMode(mode: IRunTimeViewMode) {
      self.runTimeViewMode = mode;
    },
    setAppState(newState: any) {
      self.appState = { ...self.appState, state: newState };
    },
    setInput(input: any) {
      self.appState = {
        ...self.appState,
        input,
      };
    },
  }));

export interface IStore extends Instance<typeof Store> {}

export function createNewProject(name: string) {
  const stateParamter = {
    id: "state",
    name: "state",
    type: "state",
  };

  const inputParamter = {
    id: "input",
    name: "input",
    type: "input",
  };

  const outputCountParamter = {
    id: generateId(),
    name: "scene",
    type: "scene",
  };

  const outputStateParamter = {
    id: generateId(),
    name: "state",
    type: "state",
  };

  const mainFn: IFnIn = {
    id: generateId(),
    name: "main",
    core: false,
    input: [stateParamter, inputParamter],
    output: [outputStateParamter, outputCountParamter],
  };

  const updateFn: IFnIn = {
    id: "juj4lyvbfrqqpidozu71m",
    name: "update",
    core: false,
    input: [
      { id: "dzxeucqcofplf8r3z5df8", name: "state", type: "state" },
      { id: "r5k4xxambvie9dfq3r18", name: "input", type: "input" },
    ],
    output: [{ id: "6p0dkr4icqdoqfzzn1ci7f", name: "state", type: "state" }],
    tokens: [],
    wires: [
      {
        id: "juj4lyvbfrqqpidozu71m.6p0dkr4icqdoqfzzn1ci7f",
        from: {
          target: "juj4lyvbfrqqpidozu71m",
          param: "dzxeucqcofplf8r3z5df8",
          path: "juj4lyvbfrqqpidozu71m.dzxeucqcofplf8r3z5df8",
        },
        to: {
          target: "juj4lyvbfrqqpidozu71m",
          param: "6p0dkr4icqdoqfzzn1ci7f",
          path: "juj4lyvbfrqqpidozu71m.6p0dkr4icqdoqfzzn1ci7f",
        },
      },
    ],
    values: {},
    expandedParams: {},
  };

  const viewfn = {
    id: "jm3lc1slldwo6k7vuuu5",
    name: "view",
    core: false,
    input: [{ id: "06chbzwndnnv7ej79h111d3", name: "state", type: "state" }],
    output: [{ id: "gy6jkwawe3et4wiwx2cj0e", name: "scene", type: "scene" }],
    tokens: [],
    wires: [],
    values: {},
    expandedParams: {},
  };

  const state: ITypeIn = {
    id: "state",
    name: "state",
    core: false,
    params: [],
  };

  return {
    id: generateId(),
    name: name,
    functions: {
      ...coreFunctions,
      [mainFn.id]: mainFn,
      [updateFn.id]: updateFn,
      [viewfn.id]: viewfn,
    },
    mainFn: mainFn.id,
    types: { ...coreTypes, state },
  };
}

export function executeProject(
  fn: IFn,
  inputValue: Record<string, any>
): Record<string, any> {
  const output = calculateFunction(fn, inputValue);
  const r = mapOutputToValues(fn.sockets, output);

  return r;
}

export function calculateApp(
  fn: IFn,
  inputValue: Record<string, any>
): Record<string, any> {
  const calculatedState = { [fn.id]: inputValue };
  const constValues = fn.values.toJSON();
  const unFlatConst = unFlatten(constValues);
  const combinedState = mergeDeepLeft(calculatedState, unFlatConst);
  const output: any = getValuesForSockets(fn, fn.sockets, combinedState);

  return output;
}

export function calculateFunction(
  fn: IFn,
  inputValue: Record<string, any>
): Record<string, any> {
  if (fn.core) {
    return (coreFunctionProcesses[fn.id] as any)(inputValue);
  }
  const calculatedState = { [fn.id]: inputValue };
  const constValues = fn.values.toJSON();
  const unFlatConst = unFlatten(constValues);
  const combinedState = mergeDeepLeft(calculatedState, unFlatConst);

  const output: any = getValuesForSockets(fn, fn.sockets, combinedState);

  const fnVal = output[fn.id];
  const sockets = mapSocketsToValues(fn.sockets, { ...fnVal, ...output });
  const o = { ...fnVal, ...output, ...sockets };

  return o;
}

function unFlatten(constValues: IKeyValueMap<any>): any {
  return Object.entries(constValues).reduce(
    (accumulator: any, keyValue: any) => {
      return setValue(keyValue[0], keyValue[1], accumulator);
    },
    {}
  );
}

export function getValue(p: string, object: any): any {
  return path(p.split("."), object);
}

function setValue(path: string, value: any, object: Object): Object {
  return assocPath(path.split("."), value, object);
}

function getValuesForSockets(
  fn: IFn,
  sockets: ISocket[],
  calculatedState: Object
): Object {
  return sockets.reduce((accumulator, socket) => {
    const connection = socket.connection;

    if (connection) {
      const wireValue = findPlugValue(fn, connection, accumulator);

      if (socket.params) {
        const socks = getValuesForSockets(fn, socket.params, wireValue);

        return socks;
      }

      return wireValue;
    } else if (socket.params) {
      return getValuesForSockets(fn, socket.params, accumulator);
    } else {
      return accumulator;
    }
  }, calculatedState);
}

function findPlugValue(fn: IFn, connection: IPath, calculatedState: Object) {
  const val = getValue(connection.path, calculatedState);

  if (val !== undefined) {
    return calculatedState;
  } else {
    if (getType(connection.target) === Token) {
      const token = connection.target as IToken;

      const computedValues: any = getValuesForSockets(
        fn,
        token.sockets,
        calculatedState
      );
      const outPutValue = runToken(token, computedValues);
      return outPutValue;
    } else {
      return setValue(
        connection.path,
        connection.param.type.defaultValue,
        calculatedState
      );
    }
  }
}

function runToken(token: IToken, plugValues: Object) {
  const input = mapSocketsToValues(token.sockets, plugValues);
  const r = calculateFunction(token.fn, input);
  const addToken = setValue(token.id, r, plugValues);
  return addToken;
}

function mapSocketsToValues(
  sockets: ISocket[],
  plugValues: Record<string, any>
): Record<string, any> {
  return sockets.reduce((accumulator, socket) => {
    const connection = socket.connection;

    if (connection) {
      if (socket.params) {
        // get the value of a connection but over right it with any wires connected deeper down the tree
        const paramValues = mapOnlyWireSocketsToValues(
          socket.params,
          plugValues
        );

        return setParamValue(socket, accumulator, {
          ...getValue(connection.path, plugValues),
          ...paramValues,
        });
      }

      return setParamValue(
        socket,
        accumulator,
        getValue(connection.path, plugValues)
      );
    }

    if (socket.value !== undefined) {
      return setParamValue(socket, accumulator, socket.value);
    } else {
      if (socket.params) {
        return setParamValue(
          socket,
          accumulator,
          mapSocketsToValues(socket.params, plugValues)
        );
      }
      // get default value
      return setParamValue(socket, accumulator, socket.type.defaultValue);
    }
  }, {});
}

function setParamValue(
  socket: ISocket,
  accumulator: Record<string, any>,
  value: any
) {
  const r =
    typeof value === "object" && !(value instanceof Array)
      ? { ...value, type: socket.param.type.id }
      : value;

  return {
    [socket.param.id]: r,
    ...accumulator,
  };
}

// we need this so we only override a parent data with stuff that has been expressly wired to the the children
function mapOnlyWireSocketsToValues(
  sockets: ISocket[],
  plugValues: Record<string, any>
): Record<string, any> {
  return sockets.reduce((accumulator, socket) => {
    const connection = socket.connection;

    if (connection) {
      if (socket.params) {
        const paramValues = mapOnlyWireSocketsToValues(
          socket.params,
          plugValues
        );
        return {
          [socket.param.id]: {
            ...getValue(connection.path, plugValues),
            ...paramValues,
          },
          ...accumulator,
        };
      }

      return {
        [socket.param.id]: getValue(connection.path, plugValues),
        ...accumulator,
      };
    }

    return accumulator;
  }, {});
}

export function findWireTo(wires: IWire[], path: string): IWire | undefined {
  return wires.find((wire) => wire.to.path === path);
}

export function mapOutputToValues(
  sockets: ISocket[],
  values: Record<string, any>
): Record<string, any> {
  return sockets.reduce((accumulator, socket) => {
    return {
      ...accumulator,
      [socket.param.name]: values[socket.param.id],
    };
  }, {});
}

export interface IStore extends Instance<typeof Store> {}
const StoreContext = createContext<null | IStore>(null);

export const StoreProvider = StoreContext.Provider;
export function useStore() {
  const store = useContext(StoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

export function log<T>(t: T): T {
  console.log(t);
  return t;
}

export function getStore(target: IAnyStateTreeNode): IStore {
  return getRoot<IStore>(target);
}

export function checkCircularDependency(drag: IPath, socket: ISocket): boolean {
  if (drag.target.fn === undefined) {
    return false;
  }
  if (drag.target.id === socket.target.id) {
    return true;
  }

  return drag.target.sockets.some((sock: ISocket) => {
    if (sock.connection) {
      return checkCircularDependency(sock.connection, socket);
    }
    return false;
  });
}
