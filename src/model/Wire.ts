import { types, Instance } from "mobx-state-tree";
import { generateId } from "../utils/generateId";

export const Wire = types.model({
  id: types.optional(types.identifier, generateId),
  from: types.string,
  to: types.string,
});

export interface IWire extends Instance<typeof Wire> {}
