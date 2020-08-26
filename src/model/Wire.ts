import { types, Instance } from "mobx-state-tree";
import { Param } from "./Param";

export const Wire = types.model({
  id: types.identifier,
  from: types.reference(Param),
  to: types.reference(Param),
});

export interface IWire extends Instance<typeof Wire> {}
