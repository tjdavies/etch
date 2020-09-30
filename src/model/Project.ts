import { types, Instance } from "mobx-state-tree";
import { Type, IType } from "./Type";
import { Fn, IFn } from "./Fn";
import { IPath } from "./Path";
import { calculateApp, getStore } from "./Store";

export const Project = types
  .model({
    id: types.identifier,
    name: types.string,
    functions: types.map(Fn),
    mainFn: types.reference(Fn),
    types: types.map(Type),
  })
  .views((self) => ({
    get typeList(): IType[] {
      return Array.from(self.types.values());
    },
    get functionList(): IFn[] {
      return Array.from(self.functions.values());
    },
  }))
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    createNewType(name: string) {
      const newType = Type.create({
        name,
        core: false,
        params: [],
      });
      self.types.put(newType);
      return newType;
    },
    deletePath(path: IPath) {
      const store = getStore(self);
      store.setActiveSocket(undefined);
      self.functions.forEach((f) => f.removeAllWiresWithPath(path));
      path.param.delete();
    },
  }));

export interface IProject extends Instance<typeof Project> {}
