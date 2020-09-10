import {
  types,
  Instance,
  SnapshotIn,
  getParent,
  getRoot,
} from "mobx-state-tree";
import { Param } from "./Param";
import { Token, ITokenIn } from "./Token";
import { IPoint } from "./Point";
import { generateId } from "../utils/generateId";
import { Wire } from "./Wire";
import { IPath } from "./Path";
import { Store } from "./Store";

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
      const newToken: ITokenIn = {
        id: generateId(),
        position,
        fn: fn.id,
      };
      self.tokens.push(newToken);
    },
  }));

export const FnRef = types.reference(Fn, {
  get(identifier: string, parent: any /*Store*/): any {
    console.log("getting ");
    console.log(identifier);
    return (
      getRoot<typeof Store>(parent).project.functions.get(identifier) || null
    );
  },

  set(value) {
    return value.id;
  },
});

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
