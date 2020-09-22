import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { DraggableWire } from "./DraggableWire";
import { useStore } from "../../../model/Store";
import { IPath } from "../../../model/Path";

export const ConnectorCircle = styled.div`
  border: 1px solid ${Colours.lightGrey};
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

export const ConnectorWrapper = styled.div`
  position: absolute;
  right: -30px;
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
        <ConnectorCircle id={path.path} />
        <WireSVG>
          <DraggableWire
            from={{ x: 0, y: 0 }}
            to={{ x: 0, y: 0 }}
            onStartDrag={() => store.startDrag(path)}
            onStopDrag={() => store.stopDrag()}
            color={path.param.type.colour}
          />
        </WireSVG>
      </ConnectorWrapper>
    </>
  );
}
