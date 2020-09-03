import { types, Instance, SnapshotIn } from "mobx-state-tree";
import { Param } from "./Param";
import { Token, ITokenIn, IPlug } from "./Token";
import { IPoint } from "./Point";
import { generateId } from "../utils/generateId";
import { Wire } from "./Wire";

export const Fn = types
  .model({
    id: types.identifier,
    name: types.string,
    core: types.boolean,
    input: types.array(Param),
    output: types.array(Param),
    tokens: types.array(Token),
    wires: types.array(Wire),
  })
  .views((self) => ({
    get plugs(): IPlug[] {
      return self.input.map((param) => {
        return {
          id: self.id + "/" + param.id,
          param,
        };
      });
    },
    get sockets(): IPlug[] {
      return self.output.map((param) => {
        return {
          id: self.id + "/" + param.id,
          param,
        };
      });
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    addToken(position: IPoint, fn: IFn) {
      const newToken: ITokenIn = {
        id: generateId(),
        position,
        fn: fn.id,
      };
      self.tokens.push(newToken);
    },
  }));

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
