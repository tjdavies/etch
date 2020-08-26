import { types, Instance } from "mobx-state-tree";

export const Project = types
  .model({
    id: types.identifier,
    name: types.string,
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IProject extends Instance<typeof Project> {}
