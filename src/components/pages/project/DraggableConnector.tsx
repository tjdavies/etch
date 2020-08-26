import React, { useState } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import Draggable from "react-draggable";
import { Wire } from "./Wire";
import { useConnectionDragState } from "../../../State";
import { useStore } from "../../../model/Store";
import { IParam } from "../../../model/Param";
import { isNull } from "util";
import { observer } from "mobx-react-lite";

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
  param: IParam;
}

export const DraggableConnector = ({ connectionId, param }: Props) => {
  const [startPos, setStartPos] = useState();
  const [connectionDrag, setConnectionDrag] = useConnectionDragState();

  const store = useStore();
  return (
    <Draggable
      position={startPos}
      onStart={(e, data) => {
        const pos = { x: data.x, y: data.y };
        setStartPos(pos);
        setConnectionDrag({
          connectionId,
        });

        store.setActiveDrag(param);
      }}
      onDrag={(e, data) =>
        setConnectionDrag({
          connectionId,
        })
      }
      onStop={(e, data) => {
        store.setActiveDrag(null);
        setConnectionDrag(null);
      }}
    >
      <Connector id={connectionId + ".drag"} />
    </Draggable>
  );
};
