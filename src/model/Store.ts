import { Project } from "./Project";
import { types, Instance } from "mobx-state-tree";
import { generateId } from "../utils/generateId";
import { createContext, useContext } from "react";
import { Fn, IFnIn, IFn } from "./Fn";
import { IPoint } from "./Point";
import { coreFunctions, coreFunctionProcesses } from "./CoreFunctions";
import { IWire } from "./Wire";
import { IPlug, Plug } from "./Plug";

export const Store = types
  .model({
    projects: types.array(Project),
    activeProject: types.maybe(types.reference(Project)),
    activeFunction: types.maybe(types.reference(Fn)),
    activeDrag: types.maybe(types.string),
    activeSocket: types.maybe(Plug),
  })
  .actions((self) => ({
    createNewProject() {
      const inputCountParamter = {
        id: generateId(),
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
    activeDragPlug(drag: string) {
      self.activeDrag = drag;
    },
    startDrag(drag: string) {
      self.activeDrag = drag;
    },
    stopDrag() {
      if (self.activeDrag && self.activeSocket) {
        self.activeFunction?.wires.push({
          from: self.activeDrag,
          to: self.activeSocket.id,
        });
      }

      self.activeDrag = undefined;
    },
    setActiveSocket(param: IPlug | undefined) {
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
    runApp() {
      if (self.activeProject) {
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

  const values = mapInputToValues(fn.plugs, inputValue);

  //const results = mapPlugsToOutput(fn, values);

  return mapPlugsToOutput(fn.wires, fn.sockets, values);
}

export function mapInputToValues(
  plugs: IPlug[],
  inputValue: Record<string, any>
): Record<string, any> {
  return plugs.reduce((accumulator, plug) => {
    return {
      ...accumulator,
      [plug.id]: inputValue[plug.param.id],
    };
  }, {});
}

function mapPlugsToOutput(
  wires: IWire[],
  sockets: IPlug[],
  values: Record<string, any>
): Record<string, any> | null {
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

function findWireFrom(wires: IWire[], path: string): IWire | undefined {
  return wires.find((wire) => wire.from === path);
}

function findWireTo(wires: IWire[], path: string): IWire | undefined {
  return wires.find((wire) => wire.to === path);
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
