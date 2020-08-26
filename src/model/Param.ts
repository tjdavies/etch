import {
  types,
  Instance,
  SnapshotIn,
  IAnyModelType,
  getRoot,
} from "mobx-state-tree";
import { Type } from "./Type";
import { Store } from "./Store";

export const Param = types
  .model({
    id: types.identifier,
    name: types.string,
    connections: types.array(
      types.reference(types.late((): IAnyModelType => Param))
    ),
    type: types.reference(Type),
  })
  .views((self) => ({
    get canConnect(): boolean {
      console.log(getRoot<typeof Store>(self));
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
