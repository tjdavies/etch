import { types, Instance, SnapshotIn } from "mobx-state-tree";
import { Type } from "./Type";

import { generateId } from "../utils/generateId";

export const Param = types
  .model({
    id: types.optional(types.identifier, generateId),
    name: types.string,
    type: types.reference(Type),
  })
  .views((self) => ({
    // get canConnect(): boolean {
    //  return (
    //  getRoot<typeof Store>(self).activeDrag?.param.type.id === self.type.id
    //);
    // },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IParam extends Instance<typeof Param> {}
export interface IParamIn extends SnapshotIn<typeof Param> {}
