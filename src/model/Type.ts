import {
  types,
  Instance,
  IAnyModelType,
  SnapshotIn,
  destroy,
} from "mobx-state-tree";
import { IParam, IParamIn, Param } from "./Param";
import { generateId } from "../utils/generateId";
import { getStore } from "./Store";
import { TypeColours } from "./CoreTypes";
import { Colours } from "../Style";

export const Type = types
  .model("type", {
    id: types.optional(types.identifier, generateId),
    name: types.string,
    params: types.maybe(types.array(types.late((): IAnyModelType => Param))),
    core: types.boolean,
    defaultValue: types.maybe(types.frozen()),
  })
  .views((self) => ({
    get colour(): string {
      return TypeColours[self.id] || Colours.lightGrey;
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    addParam(typeId: string) {
      const type = getStore(self).project.types.get(typeId);
      if (type) {
        const newParam: IParamIn = {
          name: type.name,
          type: type.id,
        };
        self.params?.push(newParam);
      }
    },
    createNewType(name: string) {
      const newType = getStore(self).project.createNewType(name);
      const newParam: IParamIn = {
        name: newType.name,
        type: newType.id,
      };
      self.params?.push(newParam);
    },
    deleteParam(param: IParam) {
      destroy(param);
    },
  }));

export interface IType extends Instance<typeof Type> {}
export interface ITypeIn extends SnapshotIn<typeof Type> {}
