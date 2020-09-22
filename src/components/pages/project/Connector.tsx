import React, { useState, useLayoutEffect } from "react";

import { DraggableWire } from "./DraggableWire";
import { useStore } from "../../../model/Store";

import { IPath } from "../../../model/Path";
import { observer } from "mobx-react-lite";
import { Point } from "../../../types/types";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";
import { IPlug } from "../../../model/Plug";

interface Props {
  from: IPath;
  to: IPath;
}

export const Connector = observer(({ from, to }: Props) => {
  const store = useStore();
  const [aPos, setAPos] = useState<Point | undefined>(undefined);
  const [bPos, setBPos] = useState<Point | undefined>(undefined);
  const posA = from.target.fn && from.target?.position;
  const posB = to.target.fn && to.target?.position;
  const inputs = countAllSockets(to.target.sockets);
  const outputs = countAllSockets(to.target.plugs);
  const size = useWindowSize();
  const expandFrom = from.target && from.target?.expandedParams.size;
  const expandTo = to.target && to.target?.expandedParams.size;

  useLayoutEffect(() => {
    setAPos(getLocation(from.path));
    setBPos(getLocation(to.path));
  }, [
    posA?.x,
    posA?.y,
    posB?.x,
    posB?.y,
    size,
    inputs,
    outputs,
    to.path,
    from.path,
    expandFrom,
    expandTo,
  ]);

  if (aPos && bPos) {
    return (
      <DraggableWire
        from={aPos}
        to={bPos}
        onStartDrag={() => store.startDrag(to)}
        onStopDrag={() => store.stopDrag()}
        color={from.param.type.colour}
      />
    );
  }
  return null;
});

function getLocation(id: string): Point | undefined {
  return document.getElementById(id)?.getBoundingClientRect() as Point;
}

function countAllSockets(plugs: IPlug[]): number {
  return plugs.reduce((accumulator, p) => {
    if (p.params && p.expanded) {
      accumulator += countAllSockets(p.params);
    }
    return (accumulator += 1);
  }, 0);
}
