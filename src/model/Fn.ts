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
      return self.input.flatMap((inputs) =>
        inputs.connections.map((connection) => ({
          id: inputs.id + connection.id,
          from: inputs,
          to: connection,
        }))
      );
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

export interface IFn extends Instance<typeof Fn> {}
export interface IFnIn extends SnapshotIn<typeof Fn> {}
