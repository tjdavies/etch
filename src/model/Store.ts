import { Project } from "./Project";
import { types, Instance } from "mobx-state-tree";
import { generateId } from "../utils/generateId";
import { createContext, useContext } from "react";
import { Fn, IFnIn, IFn } from "./Fn";
import { Param, IParam } from "./Param";
import { IPoint } from "./Point";
import { nullType } from "mobx-state-tree/dist/internal";
import { IPlug } from "./Token";
import { coreFunctions, coreFunctionProcesses } from "./CoreFunctions";
import { Wire } from "../components/pages/project/wires/Wire";
import { IWire } from "./Wire";
import { isNull, isNullOrUndefined } from "util";

export const Store = types
  .model({
    projects: types.array(Project),
    activeProject: types.maybe(types.reference(Project)),
    activeFunction: types.maybe(types.reference(Fn)),
    activeDrag: types.maybe(types.reference(Param)),
    activeSocket: types.maybe(types.reference(Param)),
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
    startDrag(drag: IParam) {
      self.activeDrag = drag;
    },
    stopDrag() {
      /*
      if (self.activeDrag) {
        self.activeDrag.connection = self.activeSocket;
      }
      self.activeDrag = undefined;
      */
    },
    setActiveSocket(param: IParam | undefined) {
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
