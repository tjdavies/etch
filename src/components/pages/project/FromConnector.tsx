import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";

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
  pointer-events: none;
`;

interface Props {
  path: string;
}

export function FromConnector({ path }: Props) {
  return (
    <ConnectorWrapper>
      <Connector id={path} />
    </ConnectorWrapper>
  );
}
