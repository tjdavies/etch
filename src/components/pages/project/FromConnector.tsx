import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { DraggableConnector } from "./DraggableConnector";

const Connector = styled.div`
  position: absolute;
  right: -30px;
  margin-top: 5px;
  display: block;
  border: 1px solid ${Colours.lightGrey};
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

interface Props {
  refName: string;
}

export function FromConnector({ refName }: Props) {
  return (
    <>
      <Connector id={refName} />
      <DraggableConnector connectionId={refName} />
    </>
  );
}
