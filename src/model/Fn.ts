import { types, Instance, SnapshotIn } from "mobx-state-tree";
import { Param } from "./Param";
import { Wire } from "./Wire";

export const Fn = types
  .model({
    id: types.identifier,
    name: types.string,
    input: types.array(Param),
    output: types.array(Param),
    connections: types.array(Wire),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
