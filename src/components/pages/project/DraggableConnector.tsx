import React, { useState } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import Draggable from "react-draggable";
import { Wire } from "./Wire";
import { useConnectionDragState } from "../../../State";

const Connector = styled.div`
  position: absolute;
  top: 0;
  border: 2px solid ${Colours.primary};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${Colours.primary};
  cursor: pointer;
`;

interface Props {
  connectionId: string;
}

export function DraggableConnector({ connectionId }: Props) {
  const [startPos, setStartPos] = useState();
  const [connectionDrag, setConnectionDrag] = useConnectionDragState();

  return (
    <Draggable
      position={startPos}
      onStart={(e, data) => {
        const pos = { x: data.x, y: data.y };
        setStartPos(pos);
        setConnectionDrag({
          connectionId,
        });
      }}
      onDrag={(e, data) =>
        setConnectionDrag({
          connectionId,
        })
      }
      onStop={(e, data) => {
        setConnectionDrag(null);
      }}
    >
      <Connector id={connectionId + ".drag"} />
    </Draggable>
  );
}
