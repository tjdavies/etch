import { Project, IProject } from "./Project";
import { types, Instance } from "mobx-state-tree";
import { generateId } from "../utils/generateId";
import { createContext, useContext } from "react";
import { Fn, IFnIn } from "./Fn";

export const Store = types
  .model({
    projects: types.array(Project),
    activeProject: types.maybe(types.reference(Project)),
    activeFunction: types.maybe(types.reference(Fn)),
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

      const connection = {
        id: generateId(),
        from: inputCountParamter.id,
        to: outputCountParamter.id,
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
