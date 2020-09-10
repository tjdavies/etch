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
import { IFnIn, IFn, FnRef } from "./Fn";
import { IPoint } from "./Point";
import { coreFunctions, coreFunctionProcesses } from "./CoreFunctions";
import { IPath, Path } from "./Path";
import { IWire } from "./Wire";
import { Token, IToken } from "./Token";
import { coreTypes } from "./CoreTypes";

export const Store = types
  .model("store", {
    project: Project,
    activeFunction: FnRef,
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
      if (self.activeFunction && self.activeDrag) {
        if (self.activeSocket) {
          self.activeFunction.wires.push({
            id: self.activeDrag.path,
            from: clone(self.activeDrag),
            to: clone(self.activeSocket),
          });
        } else {
          const index = self.activeFunction.wires.findIndex(
            (i: any) => i.to.path === self.activeDrag?.path
          );
          if (index > -1) {
            self.activeFunction.wires.splice(index, 1);
          }
        }
      }

      self.activeDrag = undefined;
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
    run() {
      const v = calculateFunction(self.project.mainFn, { count: 2 });
      console.log(v);
    },
  }));

export interface IStore extends Instance<typeof Store> {}

export function createNewProject(name: string) {
  const inputCountParamter = {
    id: "count",
    name: "count",
    type: "number",
  };

  const outputCountParamter = {
    id: generateId(),
    name: "count",
    type: "number",
  };

  const mainFn: IFnIn = {
    id: generateId(),
    name: "main",
    core: false,
    input: [inputCountParamter],
    output: [outputCountParamter],
  };

  return {
    id: generateId(),
    name: name,
    functions: { ...coreFunctions, [mainFn.id]: mainFn },
    mainFn: mainFn.id,
    types: { ...coreTypes },
  };
}

export function calculateFunction(
  fn: IFn,
  inputValue: Record<string, any>
): Record<string, any> | null {
  if (fn.core) {
    return (coreFunctionProcesses[fn.id] as any)(inputValue);
  }

  let values = mapInputToValues(fn.plugs, inputValue);

  const output = getValuesForSockets(fn, fn.sockets, values);

  const results = mapPlugsToOutput(fn.wires, fn.sockets, output);

  return results;
}

function getValuesForSockets(
  fn: IFn,
  sockets: IPath[],
  plugValues: Record<string, any>
): Record<string, any> {
  const plugs = findAllPlugsForSockets(fn, sockets);

  return plugs.reduce((accumulator, plug) => {
    return findPlugValue(fn, plug, accumulator);
  }, plugValues);
}

function findPlugValue(fn: IFn, plug: IPath, plugValues: Record<string, any>) {
  console.log("findPlugValue");
  console.log(plugValues);
  console.log(plug.path);
  if (plugValues[plug.path]) {
    return plugValues;
  } else {
    console.log(plug.target);
    if (getType(plug.target) === Token) {
      const token = plug.target as IToken;
      const computedValues = getValuesForSockets(fn, token.sockets, plugValues);
      const outPutValue = runToken(fn, token, computedValues);

      if (outPutValue) {
        return {
          [plug.path]: outPutValue[plug.param.id],
          ...computedValues,
        };
      }

      return plugValues;
    } else {
      console.log("Fn");
      return plugValues;
    }
  }
}

function runToken(fn: IFn, token: IToken, plugValues: Record<string, any>) {
  console.log("runToken");
  console.log(token.id);
  const input = mapSocketsToValues(fn, token, plugValues);

  console.log("input");
  console.log(input);

  return calculateFunction(token.fn, input);
}

function mapSocketsToValues(
  fn: IFn,
  token: IToken,
  plugValues: Record<string, any>
) {
  const input = (token.sockets as IPath[]).reduce((accumulator, socket) => {
    const wire = findWireTo(fn.wires, socket.path);
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

function findAllPlugsForSockets(fn: IFn, sockets: IPath[]): IPath[] {
  return sockets
    .map((socket) => {
      const wire = findWireTo(fn.wires, socket.path);
      return wire?.from;
    })
    .filter(isNotNill);
}

function findWireTo(wires: IWire[], path: string): IWire | undefined {
  return wires.find((wire) => wire.to.path === path);
}

function isNotNill<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
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

function mapPlugsToOutput(
  wires: IWire[],
  sockets: IPath[],
  values: Record<string, any>
): Record<string, any> {
  return sockets.reduce((accumulator, socket) => {
    const wire = findWireTo(wires, socket.path);

    if (wire) {
      return {
        ...accumulator,
        [socket.param.id]: values[wire.from.path],
      };
    }
    return accumulator;
  }, {});
}

/*
function findWireTo(wires: IWire[], path: string): IWire | undefined {
  return wires.find((wire) => wire.to === path);
}
*/

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

function log<T>(t: T): T {
  console.log(t);
  return t;
}
