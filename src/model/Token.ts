import { types, Instance, SnapshotIn, getParent } from "mobx-state-tree";
import { Point, IPoint } from "./Point";
import { IFn, Fn, findContext } from "./Fn";
import { generateId } from "../utils/generateId";
import { createSockets, ISocket } from "./Sockets";
import { createPlugs, IPlug } from "./Plug";
import { calculateApp, getStore } from "./Store";
import { Type, IType } from "./Type";

export const Token = types
  .model("Token", {
    id: types.optional(types.identifier, generateId),
    position: Point,
    fn: types.late((): any => types.reference(Fn)),
    values: types.map(types.frozen()),
    expandedParams: types.map(types.boolean),
    selectedType: types.maybe(types.reference(Type)),
  })
  .views((self) => ({
    get sockets(): ISocket[] {
      return createSockets(
        self as any,
        self.fn.input,
        getParent<IFn>(self, 2).wires,
        self.values,
        self.id,
        self.expandedParams,
        this.type
      );
    },
    get plugs(): IPlug[] {
      const store = getStore(self);
      const output = store.runtimeValue;
      const contextId = store.functionContext?.id;

      const context =
        contextId !== undefined ? findContext(contextId, output) : output;

      return createPlugs(
        self as any,
        self.fn.output,
        self.id,
        self.expandedParams,
        context || {},
        this.type
      );
    },
    get type(): IType {
      return self.selectedType || self.fn.defaultSelectedType;
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
    setSelectedType(typeId: string) {
      const type = getStore(self).project.types.get(typeId);
      self.selectedType = type;
    },
  }));

export interface IToken extends Instance<typeof Token> {
  fn: IFn;
}
export interface ITokenIn extends SnapshotIn<typeof Token> {}
