import { types, Instance } from "mobx-state-tree";
import { FnRef, Fn } from "./Fn";
import { Type } from "./Type";

export const Project = types
  .model({
    id: types.identifier,
    name: types.string,
    functions: types.map(Fn),
    mainFn: FnRef,
    types: types.map(Type),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IProject extends Instance<typeof Project> {}
