import { types, Instance, SnapshotIn } from "mobx-state-tree";
import { Param } from "./Param";
import { Token, ITokenIn, IPlug } from "./Token";
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
    get plugs(): IPlug[] {
      return self.input.map((param) => {
        return {
          id: self.id + "_" + param.id,
          param,
        };
      });
    },
    get sockets(): IPlug[] {
      return self.output.map((param) => {
        return {
          id: self.id + "_" + param.id,
          param,
        };
      });
    },
    get connections() {
      return this.plugs.map((plug) => {
        return {
          id: plug.id,
          from: plug.id,
          to: plug.id,
        };
        /*
        if (param.connection) {
          return {
            id: self.id + param.id,
            from: param,
            to: param.connection,
          };
        } else {
          return {
            id: self.id + param.id,
            from: param,
            to: param,
          };
        }
        */
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
