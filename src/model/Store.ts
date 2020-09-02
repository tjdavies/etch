import { Project } from "./Project";
import { types, Instance } from "mobx-state-tree";
import { generateId } from "../utils/generateId";
import { createContext, useContext } from "react";
import { Fn, IFnIn, IFn } from "./Fn";
import { Param, IParam } from "./Param";
import { IPoint } from "./Point";

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
        input: [inputCountParamter],
        output: [outputCountParamter],
      };

      const addFn: IFnIn = {
        id: "add",
        name: "add",
        input: [
          {
            name: "A",
            type: "number",
          },
          {
            name: "B",
            type: "number",
          },
        ],
        output: [
          {
            name: "A + B",
            type: "number",
          },
        ],
      };

      self.projects.push({
        id: generateId(),
        name: "Project" + (self.projects.length + 1),
        functions: { [mainFn.id]: mainFn, add: addFn },
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
      if (self.activeDrag) {
        self.activeDrag.connection = self.activeSocket;
      }
      self.activeDrag = undefined;
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

function calculateFunction(fn: IFn, inputValue: object): object {
  const values = {
    this: inputValue,
  };

  //fn.input.map( t => t.connectionProp.id )

  return inputValue;
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
