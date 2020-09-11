import React, { useEffect, useState, useLayoutEffect } from "react";

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
  const size = useWindowSize();

  useLayoutEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;

    setAPos(getLocation(from.path));
  }, [posA?.x, posA?.y, size]);

  useLayoutEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;

    setBPos(getLocation(to.path));
  }, [posB?.x, posB?.y, size]);

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
