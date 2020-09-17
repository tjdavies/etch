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
import { IFnIn, IFn, Fn, ISocket } from "./Fn";
import { IPoint } from "./Point";
import { coreFunctions, coreFunctionProcesses } from "./CoreFunctions";
import { IPath, Path } from "./Path";
import { IWire } from "./Wire";
import { Token, IToken } from "./Token";
import { coreTypes } from "./CoreTypes";
import { ITypeIn } from "./Type";

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
    input: [stateParamter, valueAParamter],
    output: [outputStateParamter, outputCountParamter],
  };

  const state: ITypeIn = {
    id: "state",
    name: "state",
    params: [
      {
        id: "xPos",
        name: "xPos",
        type: "number",
      },
    ],
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

  const inputValues = mapInputToValues(fn.plugs, inputValue);

  const constValues = fn.values.toJSON();

  const output = getValuesForSockets(fn, fn.sockets, {
    ...inputValues,
    ...constValues,
  });

  const results = mapPlugsToOutput(fn.wires, fn.sockets, output);

  return results;
}

function getValuesForSockets(
  fn: IFn,
  sockets: ISocket[],
  plugValues: Record<string, any>
): Record<string, any> {
  return sockets.reduce((accumulator, socket) => {
    const wire = socket.connection;
    if (wire) {
      return findPlugValue(fn, wire, accumulator);
    } else {
      return accumulator;
    }
  }, plugValues);
}

function findPlugValue(fn: IFn, wire: IWire, plugValues: Record<string, any>) {
  if (plugValues[wire.from.path]) {
    return plugValues;
  } else {
    if (getType(wire.from.target) === Token) {
      const token = wire.from.target as IToken;
      const computedValues = getValuesForSockets(fn, token.sockets, plugValues);
      const outPutValue = runToken(fn, token, computedValues);

      if (outPutValue) {
        const outValue = outPutValue[wire.from.param.id];
        return {
          [wire.from.path]: outValue,
          [wire.to.path]: outValue,
          ...computedValues,
        };
      }

      return plugValues;
    } else {
      return plugValues;
    }
  }
}

function runToken(fn: IFn, token: IToken, plugValues: Record<string, any>) {
  const input = mapSocketsToValues(fn, token, plugValues);
  return calculateFunction(token.fn, input);
}

function mapSocketsToValues(
  fn: IFn,
  token: IToken,
  plugValues: Record<string, any>
) {
  const input = (token.sockets as ISocket[]).reduce((accumulator, socket) => {
    if (socket.value) {
      return {
        [socket.param.id]: socket.value,
        ...accumulator,
      };
    }

    const wire = socket.connection;
    if (wire) {
      return {
        [socket.param.id]: plugValues[wire.from.path],
        ...accumulator,
      };
    }
    return accumulator;
  }, {});
  return input;
}

export function findWireTo(wires: IWire[], path: string): IWire | undefined {
  return wires.find((wire) => wire.to.path === path);
}

export function mapInputToValues(
  plugs: IPath[],
  inputValue: Record<string, any>
): Record<string, any> {
  return plugs.reduce((accumulator, plug) => {
    return {
      ...accumulator,
      [plug.path]: inputValue[plug.param.id],
    };
  }, {});
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

function mapPlugsToOutput(
  wires: IWire[],
  sockets: ISocket[],
  values: Record<string, any>
): Record<string, any> {
  return sockets.reduce((accumulator, socket) => {
    const wire = socket.connection;

    if (wire) {
      return {
        ...accumulator,
        [socket.param.id]: values[wire.from.path],
      };
    }
    return accumulator;
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
