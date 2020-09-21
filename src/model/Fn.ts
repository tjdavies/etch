import { types, Instance, SnapshotIn, destroy, getRoot } from "mobx-state-tree";
import { Param, IParamIn } from "./Param";
import { Token, ITokenIn, IToken } from "./Token";
import { IPoint } from "./Point";
import { generateId } from "../utils/generateId";
import { Wire } from "./Wire";
import { IType } from "./Type";
import { IStore } from "./Store";
import { ISocket, createSockets } from "./Sockets";
import { createPlugs, IPlug } from "./Plug";

export const Fn = types
  .model("Fn", {
    id: types.identifier,
    name: types.string,
    core: types.boolean,
    input: types.array(Param),
    output: types.array(Param),
    tokens: types.array(Token),
    wires: types.array(Wire),
    values: types.map(types.number),
    expandedParams: types.map(types.boolean),
  })
  .views((self) => ({
    get plugs(): IPlug[] {
      return createPlugs(self as any, self.input, self.id, self.expandedParams);
    },
    get sockets(): ISocket[] {
      return createSockets(
        self as any,
        self.output,
        self.wires,
        self.values,
        self.id,
        self.expandedParams
      );
    },
    get isMain(): boolean {
      return self.id !== getRoot<IStore>(self).project.mainFn.id;
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    addToken(position: IPoint, fn: IFn) {
      position.y = position.y - 320;
      const newToken: ITokenIn = {
        id: generateId(),
        position,
        fn: fn.id,
      };
      self.tokens.push(newToken);
    },
    removeToken(token: IToken) {
      const connected = self.wires.filter(
        (wire) => wire.from.target === token || wire.to.target === token
      );
      connected.forEach((element) => {
        destroy(element);
      });
      destroy(token);
    },
    addInputParam(typeId: string) {
      const type = getRoot<IStore>(self).project.types.get(typeId);
      if (type) {
        const newParam: IParamIn = {
          name: "new",
          type: type.id,
        };
        self.input.push(newParam);
      }
    },
    addOutputParam(typeId: string) {
      const type = getRoot<IStore>(self).project.types.get(typeId);
      if (type) {
        const newParam: IParamIn = {
          name: "new",
          type: type.id,
        };
        self.output.push(newParam);
      }
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

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
