import React from "react";
import styled from "styled-components";
import { IPath } from "../../../model/Path";

const Connector = styled.div`
  border: 1px solid
    ${(props: { filled: boolean; colour: string }) =>
      props.filled ? props.colour : props.colour};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props: { filled: boolean; colour: string }) =>
    props.filled ? props.colour : "none"};
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
  colour: string;
  filled: boolean;
  socket: IPath;
  onClick: () => void;
}

export const ToConnector = ({ socket, onClick, filled, colour }: Props) => {
  return (
    <ConnectorWrapper onClick={onClick}>
      <Connector id={socket.path} filled={filled} colour={colour} />
    </ConnectorWrapper>
  );
};
