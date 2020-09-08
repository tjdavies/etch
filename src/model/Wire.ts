import { types, Instance } from "mobx-state-tree";
import { generateId } from "../utils/generateId";
import { Path } from "./Path";

export const Wire = types.model({
  id: types.optional(types.identifier, generateId),
  from: Path,
  to: Path,
});

export interface IWire extends Instance<typeof Wire> {}
