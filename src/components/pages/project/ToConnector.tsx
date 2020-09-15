import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { IPath } from "../../../model/Path";

const Connector = styled.div`
  border: 1px solid;
  border-color: ${(props: { highlight: boolean }) =>
    props.highlight ? Colours.primary : Colours.lightGrey};
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const ConnectorWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 100%;
  top: -1px;
  padding: 6px;
  margin-right: 6px;
  padding-left: 12px;
`;

interface Props {
  socket: IPath;
}

export const ToConnector = ({ socket }: Props) => {
  return (
    <ConnectorWrapper>
      <Connector id={socket.path} highlight={false} />
    </ConnectorWrapper>
  );
};
