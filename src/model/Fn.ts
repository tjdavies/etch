import {
  types,
  Instance,
  SnapshotIn,
  destroy,
  getRoot,
  resolveIdentifier,
} from "mobx-state-tree";
import { Param, IParamIn, IParam } from "./Param";
import { Token, ITokenIn, IToken } from "./Token";
import { IPoint } from "./Point";
import { generateId } from "../utils/generateId";
import { Wire } from "./Wire";
import { IPath, createPlugs } from "./Path";
import { IType } from "./Type";
import { IStore } from "./Store";
import { ISocket, createSockets } from "./Sockets";

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
  })
  .views((self) => ({
    get plugs(): IPath[] {
      return createPlugs(self as any, self.input, self.id);
    },
    get sockets(): ISocket[] {
      return createSockets(
        self as any,
        self.output,
        self.wires,
        self.values,
        self.id
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
    addInputParam(type: IType) {
      const newParam: IParamIn = {
        name: "new",
        type: type.id,
      };
      self.input.push(newParam);
    },
    addOutputParam(type: IType) {
      const newParam: IParamIn = {
        name: "new",
        type: type.id,
      };
      self.output.push(newParam);
    },
    addValue(path: string, value: number) {
      self.values.set(path, value);
    },
    removeValue(path: string) {
      self.values.delete(path);
    },
  }));

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
