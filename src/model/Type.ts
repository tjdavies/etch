import {
  types,
  Instance,
  IAnyComplexType,
  IAnyModelType,
} from "mobx-state-tree";
import { Param, IParam } from "./Param";

export const Type = types
  .model({
    id: types.identifier,
    name: types.string,
    params: types.maybe(
      types.reference(types.late((): IAnyModelType => Param))
    ),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IType extends Instance<typeof Type> {}
