import { Type, IType } from "./Type";
import { types, Instance, SnapshotIn, IAnyModelType } from "mobx-state-tree";
import { generateId } from "../utils/generateId";

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
  }));

export interface IParam extends Instance<typeof Param> {
  type: IType;
}
export interface IParamIn extends SnapshotIn<typeof Param> {}
