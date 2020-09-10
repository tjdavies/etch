import { types, Instance } from "mobx-state-tree";
import { Type } from "./Type";
import { Fn } from "./Fn";

export const Project = types
  .model({
    id: types.identifier,
    name: types.string,
    functions: types.map(Fn),
    mainFn: types.reference(Fn),
    types: types.map(Type),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IProject extends Instance<typeof Project> {}
