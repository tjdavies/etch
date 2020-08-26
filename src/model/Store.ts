import { Project, IProject } from "./Project";
import { types, Instance } from "mobx-state-tree";
import { generateId } from "../utils/generateId";
import { createContext, useContext } from "react";

export const Store = types
  .model({
    projects: types.array(Project),
    activeProject: types.maybeNull(types.reference(Project)),
  })
  .actions((self) => ({
    createNewProject() {
      self.projects.push({
        id: generateId(),
        name: "Project" + (self.projects.length + 1),
      });
    },
    setActiveProject(id: string) {
      self.activeProject = self.projects.find((p) => p.id === id) || null;
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
