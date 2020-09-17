import { IPath } from "./Path";
import { IFn } from "./Fn";
import { IToken } from "./Token";
import { IParam } from "./Param";

export interface IPlug extends IPath {
  params?: IPlug[];
  expanded: boolean;
}

export function paramToPath(
  target: IFn | IToken,
  param: IParam,
  parentPath: string,
  expandedParams: any
): IPlug {
  const path = parentPath + "." + param.id;
  return {
    target,
    param,
    path,
    params:
      param.type.params &&
      createPlugs(target, param.type.params, path, expandedParams),
    expanded: expandedParams.get(path),
  };
}

export function createPlugs(
  target: IFn | IToken,
  params: IParam[],
  parentPath: string,
  expandedParams: any
): IPlug[] {
  return params.map((param) => {
    return paramToPath(target as any, param, parentPath, expandedParams);
  });
}
