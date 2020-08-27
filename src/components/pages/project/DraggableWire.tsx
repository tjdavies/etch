import React, { useState, useEffect } from "react";

import Draggable from "react-draggable";
import { Wire } from "./Wire";
import { Point } from "../../../State";

interface Props {
  from: Point;
  to: Point;
  onStartDrag: () => void;
  onStopDrag: () => void;
}

export const DraggableWire = ({ from, to, onStartDrag, onStopDrag }: Props) => {
  const [dragPos, setDragPos] = useState(to);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setDragPos(to);
  }, [to]);

  return (
    <>
      <Wire
        from={{ x: from.x + 10, y: from.y + 5 }}
        to={{ x: dragPos.x, y: dragPos.y + 5 }}
      />
      <Draggable
        position={dragPos}
        onStart={(e, data) => {
          setDragging(true);
          onStartDrag();
        }}
        onDrag={(e, data) => {
          setDragPos({ x: data.x, y: data.y });
        }}
        onStop={(e, data) => {
          setDragging(false);
          setDragPos(to);
          onStopDrag();
        }}
      >
        <circle
          cx={5}
          cy={5}
          r="5"
          style={{ pointerEvents: dragging ? "none" : "all" }}
        />
      </Draggable>
    </>
  );
};
