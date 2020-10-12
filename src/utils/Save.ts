import HelloWorld from "../assets/demos/HelloWorld.json";
import NinjaFrog from "../assets/demos/NinjaFrog.json";

export const PROJECT_LIST = "PROJECT_LIST";
const PROJECT_PREFIX = "ETCH_";

export function saveProjectList(projectList: any[]) {
  localStorage.setItem(PROJECT_LIST, JSON.stringify(projectList));
}

export function loadProjectList(): any[] {
  const projectList = localStorage.getItem(PROJECT_LIST);
  if (projectList) {
    return JSON.parse(projectList);
  } else {
    return [];
  }
}

export function saveProject(data: any) {
  localStorage.setItem(PROJECT_PREFIX + data.id, JSON.stringify(data));
  const projectList = loadProjectList();
  if (projectList) {
    const i = projectList.findIndex((p) => p.id === data.id);
    if (i === -1) {
      saveProjectList([...projectList, { id: data.id, name: data.name }]);
    } else {
      projectList[i].name = data.name;
      saveProjectList(projectList);
    }
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
