import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { DraggableConnector } from "./DraggableConnector";

const Connector = styled.div`
  border: 1px solid;
  border-color: ${(props: { highlight: boolean }) =>
    props.highlight ? Colours.primary : Colours.lightGrey};
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
  highlight: boolean;
}

export function ToConnector({ refName, dragRef, highlight }: Props) {
  return (
    <ConnectorWrapper>
      <Connector id={refName} highlight={highlight} />
    </ConnectorWrapper>
  );
}
