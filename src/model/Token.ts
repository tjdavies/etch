import { types, Instance, SnapshotIn, IAnyModelType } from "mobx-state-tree";
import { Point, IPoint } from "./Point";
import { IFn, FnRef } from "./Fn";
import { generateId } from "../utils/generateId";
import { IParam } from "./Param";

export const Token = types
  .model("Token", {
    id: types.optional(types.identifier, generateId),
    position: Point,
    fn: types.late((): any => FnRef),
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
  .actions((self) => ({
    setPosition(position: IPoint) {
      self.position = position;
    },
  }));

export interface IToken extends Instance<typeof Token> {
  fn: IFn;
}
export interface ITokenIn extends SnapshotIn<typeof Token> {}
