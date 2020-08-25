import React from "react";

import { Wire } from "./Wire";
import { useConnectionDragState } from "../../../State";

export function DragWire() {
  const [connectionDrag] = useConnectionDragState();

  if (connectionDrag) {
    const a = getLocation(connectionDrag?.connectionId);
    const b = getLocation(connectionDrag?.connectionId + ".drag");
    if (a && b) {
      return (
        <Wire from={{ x: a.x + 10, y: a.y + 5 }} to={{ x: b.x, y: b.y + 5 }} />
      );
    }
  }

  return null;
}

function getLocation(id: string) {
  return document.getElementById(id)?.getBoundingClientRect();
}
