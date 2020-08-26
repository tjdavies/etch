import { Project, IProject } from "./Project";
import { types, Instance } from "mobx-state-tree";
import { generateId } from "../utils/generateId";
import { createContext, useContext } from "react";
import { Fn, IFnIn } from "./Fn";
import { Param, IParam } from "./Param";

export const Store = types
  .model({
    projects: types.array(Project),
    activeProject: types.maybe(types.reference(Project)),
    activeFunction: types.maybe(types.reference(Fn)),
    activeDrag: types.maybeNull(types.reference(Param)),
  })
  .actions((self) => ({
    createNewProject() {
      const inputCountParamter = {
        id: generateId(),
        name: "count",
        type: "string",
      };

      const outputCountParamter = {
        id: generateId(),
        name: "count",
        type: "string",
      };

      const mainFn: IFnIn = {
        id: generateId(),
        name: "main",
        input: [inputCountParamter],
        output: [outputCountParamter],
      };

      self.projects.push({
        id: generateId(),
        name: "Project" + (self.projects.length + 1),
        functions: [mainFn],
        mainFn: mainFn.id,
        types: [
          {
            id: "string",
            name: "string",
          },
        ],
      });
    },
    setActiveDrag(param: IParam | null) {
      self.activeDrag = param;
    },
    setActiveProject(id: string) {
      self.activeProject = self.projects.find((p) => p.id === id);
      self.activeFunction = self.activeProject?.mainFn;
    },
  }));

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
