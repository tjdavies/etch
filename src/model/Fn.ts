import { observable, action, reaction, computed } from "mobx";

export interface FnData {
  id: string;
  name: string;
}

export class Fn {
  id: string = "";
  @observable name: string = "";

  constructor(data: FnData) {
    this.id = data.id;
    this.name = data.name;
  }

  @action
  setName(name: string) {
    this.name = name;
  }

  toJson(): FnData {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
