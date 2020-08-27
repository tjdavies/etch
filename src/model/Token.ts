import { types, Instance, SnapshotIn, IAnyModelType } from "mobx-state-tree";
import { Point } from "./Point";
import { Fn } from "./Fn";

export const Token = types
  .model({
    id: types.identifier,
    position: Point,
    fn: types.reference(types.late((): IAnyModelType => Fn)),
  })
  .actions((self) => ({}));

export interface IToken extends Instance<typeof Token> {}
export interface ITokenIn extends SnapshotIn<typeof Token> {}
