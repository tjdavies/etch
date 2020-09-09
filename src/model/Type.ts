import {
  types,
  Instance,
  IAnyModelType,
  SnapshotIn,
  getParent,
} from "mobx-state-tree";
import { Param } from "./Param";
import { generateId } from "../utils/generateId";

export const Type = types
  .model("type", {
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
      return (getParent(parent, 4) as any).types.get(identifier) || null;
    },

    set(value) {
      return value.id;
    },
  })
);

export interface IType extends Instance<typeof Type> {}
export interface ITypeIn extends SnapshotIn<typeof Type> {}
