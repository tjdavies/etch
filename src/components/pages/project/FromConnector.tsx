import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { DraggableWire } from "./DraggableWire";
import { useStore } from "../../../model/Store";
import { DataOutput } from "./DataOutput";
import { ISocket } from "../../../model/Sockets";

export const ConnectorCircle = styled.div`
  margin-top: 5px;
  margin-left: 5px;
  border: 1px solid ${Colours.lightGrey};
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const Wrap = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
`;

const WireSVG = styled.svg`
  position: absolute;
  overflow: visible;
  pointer-events: none;
  top: 0px;
`;

interface Props {
  path: ISocket;
}

export function FromConnector({ path }: Props) {
  const store = useStore();

  return (
    <Wrap id={path.path}>
      <ConnectorCircle />

      <WireSVG>
        <DraggableWire
          from={{ x: 0, y: 0 }}
          to={{ x: 0, y: 0 }}
          onStartDrag={() => store.startDrag(path)}
          onStopDrag={() => store.stopDrag()}
          color={path.type.colour}
        />
      </WireSVG>
      {path.data !== undefined && (
        <DataOutput value={path.data} type={path.type} />
      )}
    </Wrap>
  );
}
