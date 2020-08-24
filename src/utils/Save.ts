import { Project, ProjectRef } from "../State";

export const PROJECT_LIST = "PROJECT_LIST";
const PROJECT_PREFIX = "ETCH_";

export function saveProjectList(projectList: ProjectRef[]) {
  localStorage.setItem(PROJECT_LIST, JSON.stringify(projectList));
}

export function loadProjectList(): ProjectRef[] | undefined {
  const projectList = localStorage.getItem(PROJECT_LIST);
  if (projectList) {
    return JSON.parse(projectList);
  }
}

export function saveProject(data: Project) {
  localStorage.setItem(PROJECT_PREFIX + data.id, JSON.stringify(data));
}

export function loadProject(id: string): Project | undefined {
  const saved = localStorage.getItem(PROJECT_PREFIX + id);
  if (saved) {
    return JSON.parse(saved);
  }
}
