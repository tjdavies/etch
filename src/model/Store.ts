import { Project } from "./Project";
import {
  types,
  Instance,
  clone,
  getType,
  isStateTreeNode,
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
import { IPlug } from "./Plug";
import { IKeyValueMap } from "mobx";
import { any, assocPath, hasPath, mergeDeepLeft, path } from "ramda";

export const Store = types
  .model("store", {
    project: Project,
    activeFunction: types.reference(Fn),
    activeDrag: types.maybe(Path),
    activeSocket: types.maybe(Path),
  })
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
        const index = self.activeFunction.wires.findIndex(
          (i: any) => i.to.path === self.activeDrag?.path
        );

        if (self.activeSocket) {
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
          if (index > -1) {
            self.activeFunction.wires.splice(index, 1);
          }
        }
      }

      self.activeDrag = undefined;
    },
    setActiveFunction(fn: IFn) {
      self.activeFunction = fn;
    },
    setActiveSocket(param: IPath | undefined) {
      self.activeSocket = param;
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
  }));

export interface IStore extends Instance<typeof Store> {}

export function createNewProject(name: string) {
  const valueAParamter = {
    id: "time",
    name: "time",
    type: "number",
  };

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
    input: [stateParamter, inputParamter, valueAParamter],
    output: [outputStateParamter, outputCountParamter],
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
    functions: { ...coreFunctions, [mainFn.id]: mainFn },
    mainFn: mainFn.id,
    types: { ...coreTypes, state },
  };
}

export function calculateFunction(
  fn: IFn,
  inputValue: Record<string, any>
): Record<string, any> | null {
  if (fn.core) {
    return (coreFunctionProcesses[fn.id] as any)(inputValue);
  }

  const calculatedState = { [fn.id]: inputValue };

  const constValues = fn.values.toJSON();
  const unFlatConst = unFlatten(constValues);

  const combinedState = mergeDeepLeft(calculatedState, unFlatConst);

  const output: any = getValuesForSockets(fn, fn.sockets, combinedState);

  const results = output[fn.id];

  return results;
}

function unFlatten(constValues: IKeyValueMap<any>): any {
  return Object.entries(constValues).reduce(
    (accumulator: any, keyValue: any) => {
      return setValue(keyValue[0], keyValue[1], accumulator);
    },
    {}
  );
}

function getValue(p: string, object: any): any {
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
    const wire = socket.connection;

    if (wire) {
      return findPlugValue(fn, wire, accumulator);
    } else if (socket.params) {
      return getValuesForSockets(fn, socket.params, accumulator);
    } else {
      return accumulator;
    }
  }, calculatedState);
}

function findPlugValue(fn: IFn, wire: IWire, calculatedState: Object) {
  const val = getValue(wire.from.path, calculatedState);
  if (val !== undefined) {
    return setValue(wire.to.path, val, calculatedState);
  } else {
    if (getType(wire.from.target) === Token) {
      const token = wire.from.target as IToken;

      const computedValues: any = getValuesForSockets(
        fn,
        token.sockets,
        calculatedState
      );

      const outPutValue = runToken(token, computedValues);

      if (outPutValue) {
        const outValue = outPutValue[wire.from.param.id];
        const cc = setValue(wire.from.path, outValue, computedValues);
        const c = setValue(wire.to.path, outValue, cc);
        return c;
      }

      return computedValues;
    } else {
      return setValue(
        wire.from.path,
        wire.from.param.type.defaultValue,
        calculatedState
      );
    }
  }
}

function runToken(token: IToken, plugValues: Object) {
  console.log("computedValues");
  console.log(plugValues);
  const input = mapSocketsToValues(token, plugValues);
  console.log("mapSocketsToValues");
  console.log(input);
  return calculateFunction(token.fn, input);
}

function mapSocketsToValues(token: IToken, plugValues: Record<string, any>) {
  return token.sockets.reduce((accumulator, socket) => {
    const wire = socket.connection;
    if (wire) {
      return {
        [socket.param.id]: path(wire.from.path.split("."), plugValues),
        ...accumulator,
      };
    }

    if (socket.value !== undefined) {
      return {
        [socket.param.id]: socket.value,
        ...accumulator,
      };
    } else {
      return {
        [socket.param.id]: socket.param.type.defaultValue,
        ...accumulator,
      };
    }
  }, {});
}

export function findWireTo(wires: IWire[], path: string): IWire | undefined {
  return wires.find((wire) => wire.to.path === path);
}

export function mapOutputToValues(
  plugs: IPath[],
  value: Record<string, any>
): Record<string, any> {
  return plugs.reduce((accumulator, plug) => {
    return {
      ...accumulator,
      [plug.param.name]: value[plug.param.id],
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
