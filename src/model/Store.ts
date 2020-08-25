import { observable, action, configure } from "mobx";
import { loadProject, ProjectJson } from "../utils/Save";
import { Project } from "./Project";
import { createContext } from "react";
import { Fn } from "./Fn";

configure({ enforceActions: "observed" });

class StoreClass {
  @observable project: Project | null = null;
  @observable activeFunction: Fn | null = null;

  @action
  loadProject(id: string) {
    this.project = null;
    loadProject(id).then(this.projectLoaded, this.projectLoadError);
    
  }

  @action.bound
  projectLoaded(project: ProjectJson) {
    this.project = new Project(project);
    this.activeFunction = 
  }

  @action.bound
  projectLoadError(error: ProjectJson) {
    this.project = null;
  }
}

export const Store = createContext(new StoreClass());
