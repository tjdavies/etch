import { IPath } from "./Path";
import { IFn } from "./Fn";
import { IToken } from "./Token";
import { IParam } from "./Param";

export interface IPlug extends IPath {}

export function paramToPath(
  target: IFn | IToken,
  param: IParam,
  parentPath: string
): IPlug {
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
): IPlug[] {
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
