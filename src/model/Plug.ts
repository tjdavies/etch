import { types, Instance, SnapshotIn } from "mobx-state-tree";
import { Param } from "./Param";

export const Plug = types.model({
  id: types.identifier,
  param: types.reference(Param),
});

export interface IPlug extends Instance<typeof Plug> {}
