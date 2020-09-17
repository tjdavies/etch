import { IPath } from "./Path";
import { IFn } from "./Fn";
import { IToken } from "./Token";
import { IParam } from "./Param";

export interface IPlug extends IPath {
  params?: IPlug[];
}

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
    params: param.type.params && createPlugs(target, param.type.params, path),
  };
}

export function createPlugs(
  target: IFn | IToken,
  params: IParam[],
  parentPath: string
): IPlug[] {
  return params.map((param) => {
    return paramToPath(target as any, param, parentPath);
  });
}
