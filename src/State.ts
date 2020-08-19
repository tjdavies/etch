import { createGlobalState } from "react-hooks-global-state";
import {
  loadProjectList,
  saveProjectList,
  saveProject,
  loadProject as loadProjectFromLocalState,
} from "./utils/Save";

interface State {
  projectList: ProjectRef[];
  project: Project | null;
}

export interface ProjectRef {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
}

const initialState: State = { project: null, projectList: [] };

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState(
  initialState
);

function setProject(fn: React.SetStateAction<Project>) {
  setGlobalState("project", (p) => {
    if (p) {
      if (isFunction(fn)) return (fn as any)(p);
    }
    return fn;
  });
  const p = getProject();
  if (p) {
    saveProject(p);
  }
}

function setProjectList(fn: React.SetStateAction<State["projectList"]>) {
  setGlobalState("projectList", fn);
}

function getProjectList(): ProjectRef[] {
  return getGlobalState("projectList");
}

function getProject(): Project | null {
  return getGlobalState("project");
}

export function useProjectState() {
  return useGlobalState("project");
}

export function useProjectListState() {
  return useGlobalState("projectList");
}

export function loadProjects() {
  const projectList = loadProjectList();
  if (projectList) {
    setProjectList((_) => projectList);
  }
}

export function createNewProject() {
  const existingProjects = getProjectList() || [];
  const newProject = {
    name: "Project " + (existingProjects.length + 1),
    id: generateId(),
  };
  setProjectList((projectList) => {
    return [...existingProjects, newProject];
  });
  saveProjectList(getProjectList());
  saveProject(newProject);
}

export function setProjectName(name: string) {
  const activeProject = getProject();
  if (activeProject) {
    setProject((project) => ({
      ...project,
      name,
    }));

    setProjectList((projectList) =>
      projectList.map((proj) =>
        proj.id === activeProject.id ? { ...proj, name } : proj
      )
    );
    saveProjectList(getProjectList());
  }
}

export function loadProject(id: string) {
  const project = loadProjectFromLocalState(id);
  if (project) {
    setProject(project);
  }
}

function generateId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function isFunction(functionToCheck: any) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}
