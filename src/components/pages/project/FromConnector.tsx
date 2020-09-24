import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { DraggableWire } from "./DraggableWire";
import { useStore } from "../../../model/Store";
import { IPath } from "../../../model/Path";
import { ObjectInspector } from "react-inspector";

export const ConnectorCircle = styled.div`
  border: 1px solid ${Colours.lightGrey};
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const WireSVG = styled.svg`
  position: absolute;
  overflow: visible;
  pointer-events: none;
  top: 5px;
`;

interface Props {
  path: IPath;
  data?: any;
}

const InspectBox = styled.div`
  position: absolute;
  top: -8px;
  left: 22px;
  border: 1px solid ${Colours.lightGrey};
`;

export function FromConnector({ path, data }: Props) {
  const store = useStore();

  return (
    <>
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
      <InspectBox>
        <ObjectInspector data={data} />
      </InspectBox>
    </>
  );
}
