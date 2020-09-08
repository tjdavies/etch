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
  margin-top: 5px;
  display: block;
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
