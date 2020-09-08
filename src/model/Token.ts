import { types, Instance, SnapshotIn, IAnyModelType } from "mobx-state-tree";
import { Point } from "./Point";
import { Fn, IFn } from "./Fn";
import { generateId } from "../utils/generateId";
import { IParam } from "./Param";
import { Path } from "./Path";

export const Token = types
  .model({
    id: types.optional(types.identifier, generateId),
    position: Point,
    fn: types.reference(types.late((): IAnyModelType => Fn)),
  })
  .views((self) => ({
    get sockets() {
      return self.fn.input.map((param: IParam) => {
        return {
          target: self,
          param: param,
          path: self.id + "/" + param.id,
        };
      });
    },
    get plugs() {
      return self.fn.output.map((param: IParam) => {
        return {
          target: self,
          param: param,
          path: self.id + "/" + param.id,
        };
      });
    },
  }))
  .actions((self) => ({}));

export interface IToken extends Instance<typeof Token> {
  fn: IFn;
}
export interface ITokenIn extends SnapshotIn<typeof Token> {}
