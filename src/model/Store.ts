import { Project } from "./Project";
import { types, Instance, clone } from "mobx-state-tree";
import { generateId } from "../utils/generateId";
import { createContext, useContext } from "react";
import { Fn, IFnIn, IFn } from "./Fn";
import { IPoint } from "./Point";
import { coreFunctions, coreFunctionProcesses } from "./CoreFunctions";
import { IPath, Path } from "./Path";
import { IWire } from "./Wire";
import { isNullOrUndefined } from "util";

export const Store = types
  .model({
    projects: types.array(Project),
    activeProject: types.maybe(types.reference(Project)),
    activeFunction: types.maybe(types.reference(Fn)),
    activeDrag: types.maybe(Path),
    activeSocket: types.maybe(Path),
  })
  .actions((self) => ({
    createNewProject() {
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

      self.projects.push({
        id: generateId(),
        name: "Project" + (self.projects.length + 1),
        functions: { ...coreFunctions, [mainFn.id]: mainFn },
        mainFn: mainFn.id,
        types: [
          {
            id: "string",
            name: "string",
          },
          {
            id: "number",
            name: "number",
          },
        ],
      });
    },
    activeDragPlug(drag: IPath) {
      self.activeDrag = clone(drag);
    },
    startDrag(drag: IPath) {
      self.activeDrag = drag;
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
            (i) => i.id === self.activeDrag?.path
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
    setActiveProject(id: string) {
      self.activeProject = self.projects.find((p) => p.id === id);
      self.activeFunction = self.activeProject?.mainFn;
    },
    createNewFunction(position: IPoint, name: string) {
      const newFn: IFnIn = {
        id: generateId(),
        core: false,
        name,
        input: [],
        output: [],
      };

      if (self.activeProject) {
        self.activeProject.functions.put(newFn);
        const f = self.activeProject.functions.get(newFn.id);
        if (f) {
          self.activeFunction?.addToken(position, f);
        }
      }
    },
    run() {
      if (self.activeProject) {
        const v = calculateFunction(self.activeProject.mainFn, { count: 2 });
        console.log(v);
      }
    },
  }));

export function calculateFunction(
  fn: IFn,
  inputValue: Record<string, any>
): Record<string, any> | null {
  if (fn.core) {
    return (coreFunctionProcesses[fn.id] as any)(inputValue);
  }

  let values = mapInputToValues(fn.plugs, inputValue);
  const plugs = findAllPlugsForSockets(fn, fn.sockets);

  console.log(plugs);

  /*
  let values = mapInputToValues(fn.plugs, inputValue);
  console.log(inputValue);
  console.log("values");
  console.log(values);

  let results = mapPlugsToOutput(fn.wires, fn.sockets, values);

  if (Object.values(results).some(isUndefined)) {
    console.log("keep going");
    values = reduceTokens(fn, values);
  }

  results = mapPlugsToOutput(fn.wires, fn.sockets, values);

  console.log("results");
  console.log(results);
  */
  return null;
}

function findPlugValue(socket: IPath, values: Record<string, any>) {
  if (values[socket.path]) {
    return values[socket.path];
  } else {
    //socket.target
  }
}

function findAllPlugsForSockets(
  fn: IFn,
  sockets: IPath[]
): (IPath | undefined)[] {
  return sockets
    .map((socket) => {
      const wire = findWireTo(fn.wires, socket.path);
      return wire?.from;
    })
    .filter(isNotNill)
    .map(log);
}

function findWireTo(wires: IWire[], path: string): IWire | undefined {
  return wires.find((wire) => wire.to.path === path);
}

function isNotNill(value: any) {
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

/*
function run(
  fn: IFn,
  inputValue: Record<string, any>
): Record<string, any> | null {
  let values = mapInputToValues(fn.plugs, inputValue);
  const plugs = findAllPlugsForSockets();
  plugs.map();
  return null;
}

function computeFn(
  fn: IFn,
  inputValue: Record<string, any>
): Record<string, any> | null {
  let values = mapInputToValues(fn.plugs, inputValue);
  const plugs = findAllPlugsForSockets();
  compute(plugs, plugValues);
  return null;
}

export function compute(plugs, plugValues) {
  const plugValues = plugs.map((plug) => {
    if (plugValues[plug.id]) {
      return plugValues[plug.id];
    } else {
      return compute(plug.target.sockets, plugValues);
    }
  });
  return computeFn(plugValues);
}
*/
/*
export function reduceTokens(
  fn: IFn,
  inputValue: Record<string, any>
): Record<string, any> {
  return fn.tokens.reduce((accumulator, token) => {
    console.log("reduceTokens");
    console.log(inputValue);
    const tokenIn = mapPlugsToOutput(fn.wires, token.sockets, accumulator);
    console.log(tokenIn);
    const tokenOut = calculateFunction(token.fn, tokenIn);
    console.log(tokenOut);
    return {
      ...accumulator,
      ...tokenOut,
    };
  }, inputValue);
}



function mapPlugsToOutput(
  wires: IWire[],
  sockets: IPlug[],
  values: Record<string, any>
): Record<string, any> {
  return sockets.reduce((accumulator, socket) => {
    const wire = findWireTo(wires, socket.id);

    if (wire) {
      return {
        ...accumulator,
        [socket.param.id]: values[wire.from],
      };
    }
    return accumulator;
  }, {});
}



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
