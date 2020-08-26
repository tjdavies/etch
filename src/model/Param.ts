import { types, Instance, SnapshotIn } from "mobx-state-tree";
import { Type } from "./Type";

export const Param = types
  .model({
    id: types.identifier,
    name: types.string,
    type: types.reference(Type),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IParam extends Instance<typeof Param> {}
export interface IParamIn extends SnapshotIn<typeof Param> {}
