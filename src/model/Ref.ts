import { types, Instance } from "mobx-state-tree";
import { Fn } from "./Fn";
import { Token } from "./Token";
import { Param } from "./Param";

export const Ref = types.model({
  target: types.union(types.reference(Fn), types.reference(Token)),
  param: types.reference(Param),
});

export interface IRef extends Instance<typeof Ref> {}
