import { types, Instance, SnapshotIn } from "mobx-state-tree";
import { Param } from "./Param";
import { Wire } from "./Wire";

export const Fn = types
  .model({
    id: types.identifier,
    name: types.string,
    input: types.array(Param),
    output: types.array(Param),
  })
  .views((self) => ({
    get connections() {
      return self.input.map((param) => {
        if (param.connection) {
          return {
            id: param.id,
            from: param,
            to: param.connection,
          };
        } else {
          return {
            id: param.id,
            from: param,
            to: param,
          };
        }
      });
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
