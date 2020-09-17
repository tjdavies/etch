import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { DraggableWire } from "./DraggableWire";
import { useStore } from "../../../model/Store";
import { IPath } from "../../../model/Path";

const Connector = styled.div`
  border: 1px solid ${Colours.lightGrey};
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const ConnectorWrapper = styled.div`
  position: absolute;
  right: -30px;
  display: block;
  padding: 5px;
  z-index: -1;
  cursor: pointer;
`;

interface Props {
  path: IPath;
}

const WireSVG = styled.svg`
  position: absolute;
  overflow: visible;
  pointer-events: none;
  top: 5px;
`;

export function FromConnector({ path }: Props) {
  const store = useStore();
  return (
    <>
      <ConnectorWrapper>
        <Connector id={path.path} />
        <WireSVG fill={Colours.primary} stroke={Colours.primary}>
          <DraggableWire
            from={{ x: 0, y: 0 }}
            to={{ x: 0, y: 0 }}
            onStartDrag={() => store.startDrag(path)}
            onStopDrag={() => store.stopDrag()}
          />
        </WireSVG>
      </ConnectorWrapper>
    </>
  );
}
