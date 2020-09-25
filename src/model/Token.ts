import { types, Instance, SnapshotIn, getParent } from "mobx-state-tree";
import { Point, IPoint } from "./Point";
import { IFn, Fn } from "./Fn";
import { generateId } from "../utils/generateId";
import { createSockets, ISocket } from "./Sockets";
import { createPlugs, IPlug } from "./Plug";
import { calculateApp, calculateFunction, getStore } from "./Store";

export const Token = types
  .model("Token", {
    id: types.optional(types.identifier, generateId),
    position: Point,
    fn: types.late((): any => types.reference(Fn)),
    values: types.map(types.frozen()),
    expandedParams: types.map(types.boolean),
  })
  .views((self) => ({
    get sockets(): ISocket[] {
      return createSockets(
        self as any,
        self.fn.input,
        getParent<IFn>(self, 2).wires,
        self.values,
        self.id,
        self.expandedParams
      );
    },
    get plugs(): IPlug[] {
      const mainFn = getStore(self).project.mainFn;
      const output = calculateApp(mainFn, {
        input: {
          rightArrow: false,
          leftArrow: false,
          upArrow: false,
          downArrow: false,
        },
        state: {},
      });

      const contextId = getStore(self).functionContext?.id;
      const context = contextId ? output[contextId] : output;

      return createPlugs(
        self as any,
        self.fn.output,
        self.id,
        self.expandedParams,
        context
      );
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
    expandParam(path: string) {
      self.expandedParams.set(path, true);
    },
    shrinkParam(path: string) {
      self.expandedParams.delete(path);
    },
  }));

export interface IToken extends Instance<typeof Token> {
  fn: IFn;
}
export interface ITokenIn extends SnapshotIn<typeof Token> {}
