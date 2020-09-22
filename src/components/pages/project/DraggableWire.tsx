import React, { useState, useEffect } from "react";

import Draggable from "react-draggable";
import { Wire } from "./wires/Wire";
import { Point } from "../../../types/types";

interface Props {
  color: string;
  from: Point;
  to: Point;
  onStartDrag: () => void;
  onStopDrag: () => void;
}

export const DraggableWire = ({
  from,
  to,
  onStartDrag,
  onStopDrag,
  color,
}: Props) => {
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
        color={color}
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
          fill={color}
          stroke={color}
        />
      </Draggable>
    </>
  );
};
