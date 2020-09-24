import { IPath } from "./Path";
import { IFn } from "./Fn";
import { IToken } from "./Token";
import { IParam } from "./Param";
import { getValue } from "./Store";

export interface IPlug extends IPath {
  params?: IPlug[];
  expanded: boolean;
  data?: any;
}

export function paramToPath(
  target: IFn | IToken,
  param: IParam,
  parentPath: string,
  expandedParams: any,
  calculatedDataValues: Record<string, any>
): IPlug {
  const path = parentPath + "." + param.id;
  console.log("getValue");
  console.log(calculatedDataValues);
  console.log(path);
  console.log(getValue(path, calculatedDataValues));
  return {
    target,
    param,
    path,
    params:
      param.type.params &&
      createPlugs(
        target,
        param.type.params,
        path,
        expandedParams,
        calculatedDataValues
      ),
    expanded: expandedParams.get(path),
    data: getValue(path, calculatedDataValues),
  } as any;
}

export function createPlugs(
  target: IFn | IToken,
  params: IParam[],
  parentPath: string,
  expandedParams: any,
  calculatedDataValues: Record<string, any>
): IPlug[] {
  return params.map((param) => {
    return paramToPath(
      target as any,
      param,
      parentPath,
      expandedParams,
      calculatedDataValues
    );
  });
}
