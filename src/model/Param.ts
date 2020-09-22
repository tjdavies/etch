import { Type, IType } from "./Type";
import {
  types,
  Instance,
  SnapshotIn,
  IAnyModelType,
  getParent,
  getRoot,
} from "mobx-state-tree";
import { generateId } from "../utils/generateId";
import { getStore, IStore } from "./Store";

export const Param = types
  .model("Param", {
    id: types.optional(types.identifier, generateId),
    name: types.string,
    type: types.reference(types.late((): IAnyModelType => Type)),
  })
  .views((self) => ({
    // get canConnect(): boolean {
    //  return (
    //  getRoot<typeof Store>(self).activeDrag?.param.type.id === self.type.id
    //);
    // },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    delete() {
      getStore(self).setActiveSocket(undefined);
      getParent<any>(self, 2).deleteParam(self as IParam);
    },
  }));

export interface IParam extends Instance<typeof Param> {
  type: IType;
}
export interface IParamIn extends SnapshotIn<typeof Param> {}
