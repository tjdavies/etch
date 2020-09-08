import { types, Instance, IAnyModelType } from "mobx-state-tree";
import { Fn } from "./Fn";
import { Token } from "./Token";
import { Param } from "./Param";
import { generateId } from "../utils/generateId";

export const Path = types.model({
  target: types.union(
    types.reference(types.late((): IAnyModelType => Fn)),
    types.reference(types.late((): IAnyModelType => Token))
  ),
  param: types.reference(Param),
  path: types.string,
});

export interface IPath extends Instance<typeof Path> {}
