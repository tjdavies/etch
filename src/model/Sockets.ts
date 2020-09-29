import { IParam } from "./Param";
import { IToken } from "./Token";
import { IWire } from "./Wire";
import { findWireTo } from "./Store";
import { IFn } from "./Fn";
import { IPath } from "./Path";
import { IType } from "./Type";

export interface ISocket extends IPath {
  value?: number;
  connection?: IWire;
  params?: ISocket[];
  expanded: boolean;
  data?: any;
  type: IType;
}

export function paramToSocket(
  target: IFn | IToken,
  param: IParam,
  wires: IWire[],
  values: any,
  parentPath: string,
  expandedParams: any,
  selectedType?: IType
): ISocket {
  const path = parentPath + "." + param.id;
  return {
    target,
    param,
    path: path,
    value: values.get(path),
    connection: findWireTo(wires, path),
    type:
      param.type.id === "through" && selectedType ? selectedType : param.type,
    params:
      param.type.params &&
      createSockets(
        target,
        param.type.params,
        wires,
        values,
        path,
        expandedParams,
        selectedType
      ),
    expanded: expandedParams.get(path),
  };
}

export function createSockets(
  target: IFn | IToken,
  params: IParam[],
  wires: IWire[],
  values: any,
  parentPath: string,
  expandedParams: any,
  selectedType?: IType
): ISocket[] {
  return params.map((param) => {
    return paramToSocket(
      target as any,
      param,
      wires,
      values,
      parentPath,
      expandedParams,
      selectedType
    );
  });
}
