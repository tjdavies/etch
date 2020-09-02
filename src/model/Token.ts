import { types, Instance, SnapshotIn, IAnyModelType } from "mobx-state-tree";
import { Point } from "./Point";
import { Fn, IFn } from "./Fn";
import { generateId } from "../utils/generateId";
import { IParam } from "./Param";

export const Token = types
  .model({
    id: types.optional(types.identifier, generateId),
    position: Point,
    fn: types.reference(types.late((): IAnyModelType => Fn)),
  })
  .views((self) => ({
    get sockets(): IPlug[] {
      return self.fn.input.map((param: IParam) => {
        return {
          id: self.id + "_" + param.id,
          param,
        };
      });
    },
    get plugs(): IPlug[] {
      return self.fn.output.map((param: IParam) => {
        return {
          id: self.id + "_" + param.id,
          param,
        };
      });
    },
  }))
  .actions((self) => ({}));

export interface IToken extends Instance<typeof Token> {
  fn: IFn;
}
export interface ITokenIn extends SnapshotIn<typeof Token> {}

export interface IPlug {
  id: string;
  param: IParam;
}
