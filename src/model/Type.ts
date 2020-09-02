import { types, Instance, IAnyModelType } from "mobx-state-tree";
import { Param } from "./Param";
import { generateId } from "../utils/generateId";

export const Type = types
  .model({
    id: types.optional(types.identifier, generateId),
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
