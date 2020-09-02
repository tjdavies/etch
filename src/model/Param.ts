import {
  types,
  Instance,
  SnapshotIn,
  IAnyModelType,
  getRoot,
} from "mobx-state-tree";
import { Type } from "./Type";
import { Store } from "./Store";
import { generateId } from "../utils/generateId";

export const Param = types
  .model({
    id: types.optional(types.identifier, generateId),
    name: types.string,
    connection: types.maybe(
      types.reference(types.late((): IAnyModelType => Param))
    ),
    type: types.reference(Type),
  })
  .views((self) => ({
    get canConnect(): boolean {
      return getRoot<typeof Store>(self).activeDrag?.type.id === self.type.id;
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IParam extends Instance<typeof Param> {}
export interface IParamIn extends SnapshotIn<typeof Param> {}
