import { types, Instance, SnapshotIn, getParent } from "mobx-state-tree";
import { Point, IPoint } from "./Point";
import { IFn, Fn } from "./Fn";
import { generateId } from "../utils/generateId";
import { IParam } from "./Param";

export const Token = types
  .model("Token", {
    id: types.optional(types.identifier, generateId),
    position: Point,
    fn: types.late((): any => types.reference(Fn)),
  })
  .views((self) => ({
    get sockets() {
      const parentValues = getParent<IFn>(self, 2).values;
      return self.fn.input.map((param: IParam) => {
        const path = self.id + "/" + param.id;

        return {
          target: self,
          param: param,
          path,
          value: parentValues.get(path),
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
    remove() {
      getParent<IFn>(self, 2).removeToken(self as IToken);
    },
  }));

export interface IToken extends Instance<typeof Token> {
  fn: IFn;
}
export interface ITokenIn extends SnapshotIn<typeof Token> {}
