import { IParam } from "./Param";
import { IToken } from "./Token";
import { IWire } from "./Wire";
import { findWireTo } from "./Store";
import { IFn } from "./Fn";
import { IPath } from "./Path";

export interface ISocket extends IPath {
  value?: number;
  connection?: IWire;
}

export function paramToSocket(
  target: IFn | IToken,
  param: IParam,
  wires: IWire[],
  values: any,
  parentPath: string
): ISocket {
  const path = parentPath + "." + param.id;
  return {
    target,
    param,
    path: path,
    value: values.get(path),
    connection: findWireTo(wires, path),
  };
}

export function createSockets(
  target: IFn | IToken,
  params: IParam[],
  wires: IWire[],
  values: any,
  parentPath: string
): ISocket[] {
  return params.flatMap((param) => {
    const masterSocket = paramToSocket(
      target as any,
      param,
      wires,
      values,
      parentPath
    );

    if (param.type.params) {
      return [
        masterSocket,
        ...createSockets(
          target as any,
          param.type.params,
          wires,
          values,
          masterSocket.path
        ),
      ];
    }

    return masterSocket;
  });
}
