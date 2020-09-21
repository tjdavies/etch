import { IParam } from "./Param";
import { IToken } from "./Token";
import { IWire } from "./Wire";
import { findWireTo } from "./Store";
import { IFn } from "./Fn";
import { IPath } from "./Path";

export interface ISocket extends IPath {
  value?: number;
  connection?: IWire;
  params?: ISocket[];
  expanded: boolean;
}

export function paramToSocket(
  target: IFn | IToken,
  param: IParam,
  wires: IWire[],
  values: any,
  parentPath: string,
  expandedParams: any
): ISocket {
  const path = parentPath + "." + param.id;
  return {
    target,
    param,
    path: path,
    value: values.get(path),
    connection: findWireTo(wires, path),
    params:
      param.type.params &&
      createSockets(
        target,
        param.type.params,
        wires,
        values,
        path,
        expandedParams
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
  expandedParams: any
): ISocket[] {
  return params.map((param) => {
    return paramToSocket(
      target as any,
      param,
      wires,
      values,
      parentPath,
      expandedParams
    );
  });
}
