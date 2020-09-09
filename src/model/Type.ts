import {
  types,
  Instance,
  IAnyModelType,
  SnapshotIn,
  resolveIdentifier,
} from "mobx-state-tree";
import { Param } from "./Param";
import { generateId } from "../utils/generateId";
import { coreTypes } from "./CoreTypes";

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

export const TypeRef = types.maybeNull(
  types.reference(Type, {
    get(identifier /* string */, parent: any /*Store*/): any {
      return (
        resolveIdentifier(Type, parent, identifier) ||
        coreTypes[identifier] ||
        null
      );
    },

    set(value) {
      return value.id;
    },
  })
);

export interface IType extends Instance<typeof Type> {}
export interface ITypeIn extends SnapshotIn<typeof Type> {}
