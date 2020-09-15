import { types, Instance } from "mobx-state-tree";

export const Value = types.model({
  path: types.identifier,
  value: types.number,
});

export interface IValue extends Instance<typeof Value> {}
