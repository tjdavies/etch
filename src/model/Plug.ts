import { IPath } from "./Path";
import { IFn } from "./Fn";
import { IToken } from "./Token";
import { IParam } from "./Param";
import { getValue } from "./Store";
import { IType } from "./Type";

export interface IPlug extends IPath {
  params?: IPlug[];
  expanded: boolean;
  data?: any;
  type: IType;
}

export function paramToPath(
  target: IFn | IToken,
  param: IParam,
  parentPath: string,
  expandedParams: any,
  calculatedDataValues: Record<string, any>,
  selectedType?: IType
): IPlug {
  const path = parentPath + "." + param.id;
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
    type:
      param.type.id === "through" && selectedType ? selectedType : param.type,
  };
}

export function createPlugs(
  target: IFn | IToken,
  params: IParam[],
  parentPath: string,
  expandedParams: any,
  calculatedDataValues: Record<string, any>,
  selectedType?: IType
): IPlug[] {
  return params.map((param) => {
    return paramToPath(
      target as any,
      param,
      parentPath,
      expandedParams,
      calculatedDataValues,
      selectedType
    );
  });
}
