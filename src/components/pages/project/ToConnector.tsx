import React from "react";
import styled from "styled-components";
import { IPath } from "../../../model/Path";

const Connector = styled.div`
  border: 1.5px solid ${(props: { colour: string }) => props.colour};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props: { filled: boolean; colour: string }) =>
    props.filled ? props.colour : "none"};
`;

interface Props {
  colour: string;
  filled: boolean;
  socket: IPath;
  onClick: () => void;
}

export const ToConnector = ({ socket, onClick, filled, colour }: Props) => {
  return (
    <div onClick={onClick}>
      <Connector id={socket.path} filled={filled} colour={colour} />
    </div>
  );
};
