import { types, Instance, SnapshotIn, IAnyModelType } from "mobx-state-tree";
import { Param } from "./Param";
import { Token, IToken } from "./Token";
import { IPoint } from "./Point";
import { generateId } from "../utils/generateId";

export const Fn = types
  .model({
    id: types.identifier,
    name: types.string,
    input: types.array(Param),
    output: types.array(Param),
    tokens: types.array(Token),
  })
  .views((self) => ({
    get connections() {
      return self.input.map((param) => {
        if (param.connection) {
          return {
            id: param.id,
            from: param,
            to: param.connection,
          };
        } else {
          return {
            id: param.id,
            from: param,
            to: param,
          };
        }
      });
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    addToken(position: IPoint, fn: IFn) {
      const newToken: IToken = {
        id: generateId(),
        position,
        fn,
      };
      self.tokens.push(newToken);
    },
  }));

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
