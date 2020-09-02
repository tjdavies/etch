import React, { useEffect, useState } from "react";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";
import { IParam } from "../../../model/Param";
import { DraggableWire } from "./DraggableWire";
import { useStore } from "../../../model/Store";
import { Point } from "../../../types/types";

interface Props {
  from: string;
  to: string;
}

export function Connector({ from, to }: Props) {
  const [aPos, setAPos] = useState<Point | null>();
  const [bPos, setBPos] = useState<Point | null>();

  const size = useWindowSize();
  const store = useStore();

  useEffect(() => {
    setAPos(getLocation(from));
    setBPos(getLocation(to));
  }, [size, from, to]);

  (window as any).redraw = () => {
    setAPos(getLocation(from));
    setBPos(getLocation(to));
  };

  if (aPos && bPos) {
    return (
      <DraggableWire
        from={{ x: aPos.x, y: aPos.y }}
        to={{ x: bPos.x, y: bPos.y }}
        onStartDrag={() => null /*store.startDrag(from)*/}
        onStopDrag={() => null /*store.stopDrag()*/}
      />
    );
  }
  return null;
}

function getLocation(id: string) {
  return document.getElementById(id)?.getBoundingClientRect();
}
