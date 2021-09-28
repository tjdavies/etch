import HelloWorld from "../assets/demos/HelloWorld.json";
import NinjaFrog from "../assets/demos/NinjaFrog.json";
import { generateId } from "./generateId";

export const PROJECT_LIST = "PROJECT_LIST";
const PROJECT_PREFIX = "ETCH_";

export function saveProjectList(projectList: any[]) {
  localStorage.setItem(PROJECT_LIST, JSON.stringify(projectList));
  return projectList;
}

export function loadProjectList(): any[] {
  const projectList = localStorage.getItem(PROJECT_LIST);
  if (projectList) {
    return JSON.parse(projectList);
  } else {
    return [];
  }
}

function getValidProjectName(
  name: string,
  projectList: {
    name: string;
  }[]
): string {
  if (projectList.some((p) => p.name === name)) {
    const bits = name.split(" ");
    const lastBit = bits.pop();
    if (lastBit && parseInt(lastBit)) {
      return getValidProjectName(
        bits.join(" ") + " " + (parseInt(lastBit) + 1),
        projectList
      );
    }
    return getValidProjectName(name + " 1", projectList);
  }
  return name;
}

export function cloneProject(id: string) {
  const project = loadProject(id);
  const projectList = loadProjectList();
  const cloneName = getValidProjectName(project.name, projectList);

  console.log("cloneProject");

  return saveProject({ ...project, name: cloneName, id: generateId() });
}

export function saveProject(data: any) {
  localStorage.setItem(PROJECT_PREFIX + data.id, JSON.stringify(data));
  const projectList = loadProjectList();
  if (projectList) {
    const i = projectList.findIndex((p) => p.id === data.id);
    if (i === -1) {
      return saveProjectList([
        ...projectList,
        { id: data.id, name: data.name },
      ]);
    } else {
      projectList[i].name = data.name;
      return saveProjectList(projectList);
    }
  }
}

export function deleteProject(id: string) {
  const projectList = loadProjectList();
  if (projectList) {
    const i = projectList.findIndex((p) => p.id === id);
    projectList.splice(i, 1);
    return saveProjectList(projectList);
  }
}

export function loadProject(id: string): any {
  if (id === "hw") {
    return HelloWorld;
  }

  if (id === "nf") {
    return NinjaFrog;
  }

  const project = localStorage.getItem(PROJECT_PREFIX + id);
  if (project) {
    return JSON.parse(project);
  }
}
