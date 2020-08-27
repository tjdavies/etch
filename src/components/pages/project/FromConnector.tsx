import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { IParam } from "../../../model/Param";

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
`;

interface Props {
  param: IParam;
}

export function FromConnector({ param }: Props) {
  return (
    <ConnectorWrapper>
      <Connector id={param.id} />
    </ConnectorWrapper>
  );
}