import {
  observable,
  action,
  reaction,
  computed,
  ObservableMap,
  IKeyValueMap,
  toJS,
} from "mobx";
import { saveProject } from "../utils/Save";
import { Fn, FnData } from "./Fn";

export interface ProjectJson {
  id: string;
  name: string;
  mainFnId: string;
  functions: IKeyValueMap<FnData>;
}

type FunctionMap = { [key: string]: FnData };

export class Project {
  id: string;
  mainFnId: string = "";
  @observable name: string = "";
  @observable functions: ObservableMap<string, Fn>;

  constructor(json: ProjectJson) {
    this.id = json.id;
    this.name = json.name;
    this.mainFnId = json.mainFnId;
    this.functions = new Map(json.functions);
  }

  saveHandler = reaction(
    // observe everything that is used in the JSON:
    () => this.asJson,
    // if autoSave is on, send json to server
    (json) => {
      saveProject(json);
    }
  );

  @computed get asJson(): ProjectJson {
    return {
      id: this.id,
      name: this.name,
      mainFnId: this.mainFnId,
      functions: this.functions.toJSON(),
    };
  }

  @action
  setName(name: string) {
    this.name = name;
  }

  dispose() {
    // clean up the observer
    this.saveHandler();
  }
}
