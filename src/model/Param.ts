import { types, Instance, SnapshotIn, IAnyModelType } from "mobx-state-tree";
import { Type } from "./Type";

export const Param = types
  .model({
    id: types.identifier,
    name: types.string,
    connections: types.array(
      types.reference(types.late((): IAnyModelType => Param))
    ),
    type: types.reference(Type),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IParam extends Instance<typeof Param> {}
export interface IParamIn extends SnapshotIn<typeof Param> {}
