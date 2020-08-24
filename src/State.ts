import { createGlobalState } from "react-hooks-global-state";
import {
  loadProjectList,
  saveProjectList,
  saveProject,
  loadProject as loadProjectFromLocalState,
} from "./utils/Save";

interface State {
  project: Project | null;
  function: string | null;
}

export interface ProjectRef {
  id: string;
  name: string;
}

type FunctionMap = { [key: string]: Fn };
type TypeMap = { [key: string]: Type };

interface Type {
  id: string;
  name: string;
  types?: TypeRef[];
}

export interface Project {
  id: string;
  name: string;
  functions: FunctionMap;
  types: TypeMap;
  mainFn: string;
}

export interface TypeRef {
  name: string;
  typeId: string;
}

export interface Fn {
  id: string;
  name: string;
  input: TypeRef[];
  output: TypeRef[];
}

export interface HydratedFn {
  id: string;
  name: string;
  input: HydratedType[];
  output: HydratedType[];
}

export const primitives: TypeMap = {
  number: {
    id: "number",
    name: "number",
  },
  string: {
    id: "string",
    name: "string",
  },
  boolean: {
    id: "boolean",
    name: "boolean",
  },
};

export interface HydratedType {
  name: string;
  id: string;
  types?: HydratedType[];
}

const initialState: State = { project: null, function: null };

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

function setFunction(fn: React.SetStateAction<State["function"]>) {
  setGlobalState("function", fn);
}

function getProject(): Project | null {
  return getGlobalState("project");
}

export function useProjectState() {
  return useGlobalState("project");
}

export function useActiveFunction() {
  const activeProject = getProject();
  const [fnId] = useGlobalState("function");
  if (activeProject) {
    if (fnId) {
      return populateTypes(activeProject, activeProject.functions[fnId]);
    }
  }
}

function populateTypes(project: Project, fn: Fn): HydratedFn {
  return {
    ...fn,
    input: hydrateTypes(project, fn.input),
    output: hydrateTypes(project, fn.input),
  };
}

function hydrateTypes(project: Project, types: TypeRef[]): HydratedType[] {
  return types.map((ref) => {
    const type = getType(project, ref.typeId);

    return {
      name: ref.name,
      id: ref.typeId,
      types: type.types && hydrateTypes(project, type.types),
    };
  });
}

function getType(project: Project, id: string): Type {
  return primitives[id] || project.types[id];
}

export function createNewProject() {
  const existingProjects = loadProjectList() || [];
  const mainFn: Fn = {
    name: "main",
    id: generateId(),
    input: [{ name: "state", typeId: "state" }],
    output: [
      { name: "state", typeId: "state" },
      { name: "output", typeId: "scene" },
    ],
  };
  const newProject = {
    name: "Project " + (existingProjects.length + 1),
    id: generateId(),
    functions: {
      [mainFn.id]: mainFn,
    },
    types: {
      state: {
        id: "state",
        name: "state",
        types: [{ name: "count", typeId: "string" }],
      },
    },
    mainFn: mainFn.id,
  };
  saveProjectList([...existingProjects, newProject]);
  saveProject(newProject);
}

export function setProjectName(name: string) {
  const activeProject = getProject();
  if (activeProject) {
    setProject((project) => ({
      ...project,
      name,
    }));

    const projectList = loadProjectList() || [];
    const adjustedList = projectList.map((proj) =>
      proj.id === activeProject.id ? { ...proj, name } : proj
    );
    saveProjectList(adjustedList);
  }
}

export function loadProject(id: string) {
  const project = loadProjectFromLocalState(id);
  if (project) {
    setProject(project);
    setFunction(project.mainFn);
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
