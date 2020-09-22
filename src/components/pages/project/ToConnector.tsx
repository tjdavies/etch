import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { IPath } from "../../../model/Path";

const Connector = styled.div`
  border: 1px solid
    ${(props: { filled: boolean }) =>
      props.filled ? Colours.primary : Colours.lightGrey};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props: { filled: boolean }) =>
    props.filled ? Colours.primary : "none"};
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
  filled: boolean;
  socket: IPath;
  onClick: () => void;
}

export const ToConnector = ({ socket, onClick, filled }: Props) => {
  return (
    <ConnectorWrapper onClick={onClick}>
      <Connector id={socket.path} filled={filled} />
    </ConnectorWrapper>
  );
};
