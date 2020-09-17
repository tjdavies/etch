import React, { useState, useLayoutEffect } from "react";

import { DraggableWire } from "./DraggableWire";
import { useStore } from "../../../model/Store";

import { IPath } from "../../../model/Path";
import { observer } from "mobx-react-lite";
import { Point } from "../../../types/types";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";

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
  const inputs = to.target.input && to.target.input.length;
  const outputs = to.target.output?.length;
  const size = useWindowSize();
  const expand = from.target && from.target?.expandedParams.size;

  useLayoutEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;

    setAPos(getLocation(from.path));
  }, [posA?.x, posA?.y, size, inputs, outputs, from.path, expand]);

  useLayoutEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;

    setBPos(getLocation(to.path));
  }, [posB?.x, posB?.y, size, inputs, outputs, to.path, expand]);

  if (aPos && bPos) {
    return (
      <DraggableWire
        from={aPos}
        to={bPos}
        onStartDrag={() => store.startDrag(to)}
        onStopDrag={() => store.stopDrag()}
      />
    );
  }
  return null;
});

function getLocation(id: string): Point | undefined {
  return document.getElementById(id)?.getBoundingClientRect() as Point;
}
