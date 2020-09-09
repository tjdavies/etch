import { types, Instance, IAnyModelType } from "mobx-state-tree";
import { FnRef } from "./Fn";
import { Token } from "./Token";
import { Param } from "./Param";

export const Path = types.model({
  target: types.late((): any => types.union(types.reference(Token), FnRef)),
  param: types.reference(Param),
  path: types.string,
});

export interface IPath extends Instance<typeof Path> {}
