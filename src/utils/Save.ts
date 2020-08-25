import { ProjectRef } from "../State";

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

export function saveProject(data: any) {
  localStorage.setItem(PROJECT_PREFIX + data.id, JSON.stringify(data));
}

export function loadProject(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const saved = localStorage.getItem(PROJECT_PREFIX + id);
    if (saved) {
      resolve(JSON.parse(saved));
    }
    reject();
  });
}
