import { types, Instance, SnapshotIn } from "mobx-state-tree";

export const Point = types.model({
  x: types.number,
  y: types.number,
});

export interface IPoint extends Instance<typeof Point> {}
export interface IPointIn extends SnapshotIn<typeof Point> {}
