import { types, Instance } from "mobx-state-tree";
import { Token, IToken } from "./Token";
import { Param, IParam } from "./Param";
import { Fn, IFn } from "./Fn";
import { paramToSocket } from "./Sockets";
import { values } from "mobx";

export const Path = types.model({
  target: types.reference(types.late((): any => types.union(Token, Fn))),
  param: types.reference(Param),
  path: types.string,
});

export interface IPath extends Instance<typeof Path> {}

export function paramToPath(
  target: IFn | IToken,
  param: IParam,
  parentPath: string
): IPath {
  const path = parentPath + "." + param.id;
  return {
    target,
    param,
    path,
  };
}

export function createPlugs(
  target: IFn | IToken,
  params: IParam[],
  parentPath: string
): IPath[] {
  return params.flatMap((param) => {
    const masterPlug = paramToPath(target as any, param, parentPath);

    if (param.type.params) {
      return [
        masterPlug,
        ...createPlugs(target as any, param.type.params, masterPlug.path),
      ];
    }

    return masterPlug;
  });
}
