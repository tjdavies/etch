import React, { useEffect, useState } from "react";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";
import { IParam } from "../../../model/Param";
import { DraggableWire } from "./DraggableWire";
import { useStore } from "../../../model/Store";
import { Point } from "../../../types/types";

interface Props {
  from: IParam;
  to: IParam;
}

export function Connector({ from, to }: Props) {
  const [aPos, setAPos] = useState<Point | null>();
  const [bPos, setBPos] = useState<Point | null>();

  const size = useWindowSize();
  const store = useStore();

  useEffect(() => {
    setAPos(getLocation(from.id));
    setBPos(getLocation(to.id));
  }, [size, from, to]);

  if (aPos && bPos) {
    return (
      <DraggableWire
        from={{ x: aPos.x, y: aPos.y }}
        to={{ x: bPos.x, y: bPos.y }}
        onStartDrag={() => store.startDrag(from)}
        onStopDrag={() => store.stopDrag()}
      />
    );
  }
  return null;
}

function getLocation(id: string) {
  return document.getElementById(id)?.getBoundingClientRect();
}
