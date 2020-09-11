import { types, Instance, SnapshotIn, destroy } from "mobx-state-tree";
import { Param, IParamIn } from "./Param";
import { Token, ITokenIn, IToken } from "./Token";
import { IPoint } from "./Point";
import { generateId } from "../utils/generateId";
import { Wire } from "./Wire";
import { IPath } from "./Path";
import { IType } from "./Type";

export const Fn = types
  .model("Fn", {
    id: types.identifier,
    name: types.string,
    core: types.boolean,
    input: types.array(Param),
    output: types.array(Param),
    tokens: types.array(Token),
    wires: types.array(Wire),
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
    get sockets(): IPath[] {
      return self.output.map((param) => {
        return {
          target: self,
          param: param,
          path: self.id + "/" + param.id,
        };
      });
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    addToken(position: IPoint, fn: IFn) {
      position.y = position.y - 170;
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
      console.log(connected);
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
  }));

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
