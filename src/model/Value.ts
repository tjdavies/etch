import { types, Instance } from "mobx-state-tree";

export const Value = types.model({
  path: types.identifier,
  value: types.frozen(),
});

export interface IValue extends Instance<typeof Value> {}
