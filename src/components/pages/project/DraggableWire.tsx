import React, { useState, useEffect } from "react";

import Draggable from "react-draggable";
import { Wire } from "./wires/Wire";
import { Point } from "../../../types/types";
import styled from "styled-components";

const Box = styled.svg`
  width: 30px;
  height: 20px;
  background-color: red;
  cursor: pointer;
`;

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
    if (!dragging) {
      setDragPos(to);
    }
  }, [to, dragging]);

  return (
    <>
      <Wire
        from={{ x: from.x + 15, y: from.y + 10 }}
        to={{ x: dragPos.x + 10, y: dragPos.y + 10 }}
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
        <Box
          x={dragPos.x}
          y={dragPos.y}
          width="20"
          height="20"
          style={{ pointerEvents: dragging ? "none" : "all" }}
        >
          <circle cx={10} cy={10} r="5" fill={color} stroke={color} />
          <rect width="100%" height="100%" fill="red" opacity="0" />
        </Box>
      </Draggable>
    </>
  );
};
