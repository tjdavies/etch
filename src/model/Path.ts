import { types, Instance } from "mobx-state-tree";
import { Token } from "./Token";
import { Param } from "./Param";
import { Fn } from "./Fn";

export const Path = types.model({
  target: types.reference(types.late((): any => types.union(Token, Fn))),
  param: types.reference(Param),
  path: types.string,
});

export interface IPath extends Instance<typeof Path> {}
