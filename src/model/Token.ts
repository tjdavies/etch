import { types, Instance, SnapshotIn, getParent } from "mobx-state-tree";
import { Point, IPoint } from "./Point";
import { IFn, Fn } from "./Fn";
import { generateId } from "../utils/generateId";
import { createSockets, ISocket } from "./Sockets";
import { createPlugs } from "./Plug";

export const Token = types
  .model("Token", {
    id: types.optional(types.identifier, generateId),
    position: Point,
    fn: types.late((): any => types.reference(Fn)),
    values: types.map(types.number),
  })
  .views((self) => ({
    get sockets(): ISocket[] {
      return createSockets(
        self as any,
        self.fn.input,
        getParent<IFn>(self, 2).wires,
        self.values,
        self.id
      );
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
