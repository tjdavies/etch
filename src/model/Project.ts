import { types, Instance } from "mobx-state-tree";
import { Fn } from "./Fn";
import { Type } from "./Type";
import { generateId } from "../utils/generateId";

export const Project = types
  .model({
    id: types.identifier,
    name: types.string,
    functions: types.map(Fn),
    mainFn: types.reference(Fn),
    types: types.array(Type),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IProject extends Instance<typeof Project> {}
