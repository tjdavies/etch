import { types, Instance, IAnyModelType } from "mobx-state-tree";
import { Fn } from "./Fn";
import { Token } from "./Token";
import { Param } from "./Param";
import { generateId } from "../utils/generateId";

//const FnOrToken = types.union(Fn, Token);

export const Path = types.model({
  target: types.reference(types.late((): any => types.union(Fn, Token))),
  param: types.reference(Param),
  path: types.string,
});

export interface IPath extends Instance<typeof Path> {}
