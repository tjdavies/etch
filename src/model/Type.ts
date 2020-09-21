import {
  types,
  Instance,
  IAnyModelType,
  SnapshotIn,
  getRoot,
} from "mobx-state-tree";
import { IParamIn, Param } from "./Param";
import { generateId } from "../utils/generateId";
import { IStore } from "./Store";

export const Type = types
  .model("type", {
    id: types.optional(types.identifier, generateId),
    name: types.string,
    params: types.maybe(types.array(types.late((): IAnyModelType => Param))),
    core: types.boolean,
    defaultValue: types.maybe(types.frozen()),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    addParam(typeId: string) {
      const type = getRoot<IStore>(self).project.types.get(typeId);
      if (type) {
        const newParam: IParamIn = {
          name: "new",
          type: type.id,
        };
        self.params?.push(newParam);
      }
    },
  }));

export interface IType extends Instance<typeof Type> {}
export interface ITypeIn extends SnapshotIn<typeof Type> {}
