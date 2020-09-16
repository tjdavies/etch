import { types, Instance, SnapshotIn, destroy, getRoot } from "mobx-state-tree";
import { Param, IParamIn } from "./Param";
import { Token, ITokenIn, IToken } from "./Token";
import { IPoint } from "./Point";
import { generateId } from "../utils/generateId";
import { Wire } from "./Wire";
import { IPath } from "./Path";
import { IType } from "./Type";
import { IStore } from "./Store";

export interface ISocket extends IPath {
  value?: number;
}

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
      return self.input.map((param) => {
        return {
          target: self,
          param: param,
          path: self.id + "/" + param.id,
        };
      });
    },
    get sockets(): ISocket[] {
      return self.output.map((param) => {
        const path = self.id + "/" + param.id;
        return {
          target: self,
          param: param,
          path,
          value: self.values.get(path),
        };
      });
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
    clearAnyConnections(path: string) {
      /*
      const index = self.wires.findIndex((i: any) => i.to.path === path);
      if (index > -1) {
        self.wires.splice(index, 1);
      }*/
      self.values.delete(path);
    },
  }));

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
