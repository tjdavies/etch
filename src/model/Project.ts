import { types, Instance } from "mobx-state-tree";
import { Type, IType } from "./Type";
import { Fn, IFn } from "./Fn";

export const Project = types
  .model({
    id: types.identifier,
    name: types.string,
    functions: types.map(Fn),
    mainFn: types.reference(Fn),
    types: types.map(Type),
  })
  .views((self) => ({
    get typeList(): IType[] {
      return Array.from(self.types.values());
    },
    get functionList(): IFn[] {
      return Array.from(self.functions.values());
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IProject extends Instance<typeof Project> {}
