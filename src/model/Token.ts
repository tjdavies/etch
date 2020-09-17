import {
  types,
  Instance,
  SnapshotIn,
  getParent,
  resolveIdentifier,
} from "mobx-state-tree";
import { Point, IPoint } from "./Point";
import { IFn, Fn } from "./Fn";
import { generateId } from "../utils/generateId";
import { IParam } from "./Param";
import { Wire } from "./Wire";
import { findWireTo } from "./Store";
import { createPlugs } from "./Path";

export const Token = types
  .model("Token", {
    id: types.optional(types.identifier, generateId),
    position: Point,
    fn: types.late((): any => types.reference(Fn)),
    values: types.map(types.number),
  })
  .views((self) => ({
    get sockets() {
      return self.fn.input.map((param: IParam) => {
        const path = self.id + "/" + param.id;
        return {
          target: self,
          param: param,
          path,
          value: self.values.get(path),
          connection: findWireTo(getParent<IFn>(self, 2).wires, path),
        };
      });
    },
    get plugs() {
      return createPlugs(self as any, self.fn.output, self.id);
    },
  }))
  .actions((self) => ({
    setPosition(position: IPoint) {
      self.position = position;
    },
    remove() {
      getParent<IFn>(self, 2).removeToken(self as IToken);
    },
    addValue(path: string, value: number) {
      self.values.set(path, value);
    },
    removeValue(path: string) {
      self.values.delete(path);
    },
  }));

export interface IToken extends Instance<typeof Token> {
  fn: IFn;
}
export interface ITokenIn extends SnapshotIn<typeof Token> {}
