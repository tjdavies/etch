import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { DraggableConnector } from "./DraggableConnector";

const Connector = styled.div`
  border: 1px solid ${Colours.lightGrey};
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const ConnectorWrapper = styled.div`
  position: relative;
  display: block;
  left: -30px;
  margin-top: 5px;
  display: block;
`;

interface Props {
  refName: string;
  dragRef: string | null;
}

export function ToConnector({ refName, dragRef }: Props) {
  return (
    <ConnectorWrapper>
      <Connector id={refName} />
      {dragRef && <DraggableConnector connectionId={refName} />}
    </ConnectorWrapper>
  );
}
