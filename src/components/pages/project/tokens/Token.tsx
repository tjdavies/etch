import React from "react";
import styled from "styled-components";
import { IToken } from "../../../../model/Token";
import { Colours } from "../../../../Style";
import Draggable from "react-draggable";
import { TokenInput } from "./TokenInput";
import { TokenOutput } from "./TokenOutput";

const TokenWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${Colours.white};
`;

const TokenHeader = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${Colours.primary};
  color: ${Colours.lightText};
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: move;
`;

interface Props {
  token: IToken;
}

const TokenBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 10px;
  gap: 30px;
  border: 1px solid ${Colours.lightGrey};
  border-top: none;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
`;

export function Token({ token }: Props) {
  return (
    <Draggable
      handle={".header"}
      onDrag={(e, data) => {
        token.setPosition({ x: data.x, y: data.y });
      }}
      position={token.position}
    >
      <TokenWrapper>
        <TokenHeader className="header">{token.fn.name}</TokenHeader>
        <TokenBody>
          <TokenInput input={token.sockets} />
          <TokenOutput output={token.plugs} />
        </TokenBody>
      </TokenWrapper>
    </Draggable>
  );
}
