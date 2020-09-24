import { Type, IType } from "./Type";
import {
  types,
  Instance,
  SnapshotIn,
  IAnyModelType,
  getParent,
} from "mobx-state-tree";
import { generateId } from "../utils/generateId";

export const Param = types
  .model("Param", {
    id: types.optional(types.identifier, generateId),
    name: types.string,
    type: types.reference(types.late((): IAnyModelType => Type)),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    delete() {
      getParent<any>(self, 2).deleteParam(self as IParam);
    },
  }));

export interface IParam extends Instance<typeof Param> {
  type: IType;
}
export interface IParamIn extends SnapshotIn<typeof Param> {}
