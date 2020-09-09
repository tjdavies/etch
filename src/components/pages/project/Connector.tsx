import React from "react";

import { DraggableWire } from "./DraggableWire";
import { useStore } from "../../../model/Store";

import { IPath } from "../../../model/Path";

interface Props {
  from: IPath;
  to: IPath;
}

export function Connector({ from, to }: Props) {
  const store = useStore();

  const aPos = getLocation(from.path);
  const bPos = getLocation(to.path);

  if (aPos && bPos) {
    return (
      <DraggableWire
        from={{ x: aPos.x, y: aPos.y }}
        to={{ x: bPos.x, y: bPos.y }}
        onStartDrag={() => store.startDrag(to)}
        onStopDrag={() => store.stopDrag()}
      />
    );
  }
  return null;
}

function getLocation(id: string) {
  return document.getElementById(id)?.getBoundingClientRect();
}
