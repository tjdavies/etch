import { types, Instance } from "mobx-state-tree";

export const Wire = types.model({
  id: types.identifier,
  from: types.string,
  to: types.string,
});

export interface IWire extends Instance<typeof Wire> {}
