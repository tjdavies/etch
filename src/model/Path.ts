import { types, Instance } from "mobx-state-tree";
import { Token } from "./Token";
import { Param } from "./Param";
import { Fn } from "./Fn";
import { IType } from "./Type";

export const Path = types
  .model({
    target: types.reference(types.late((): any => types.union(Token, Fn))),
    param: types.reference(Param),
    path: types.string,
  })
  .views((self) => ({
    get type(): IType {
      console.log(self);
      return self.param.type.id === "through" && self.target.selectedType
        ? self.target.selectedType
        : self.param.type;
    },
  }));

export interface IPath extends Instance<typeof Path> {}
