import React, { useState } from "react";
import styled from "styled-components";
import { IToken } from "../../../../model/Token";
import { Point } from "../../../../types/types";
import { Colours } from "../../../../Style";
import Draggable from "react-draggable";
import { FunctionInput } from "../FunctionInput";
import { TokenInput } from "./TokenInput";
import { TokenOutput } from "./TokenOutput";

interface TokenWrapperProps {
  position: Point;
}

const TokenWrapper = styled.div`
  position: absolute;
  left: ${(props: TokenWrapperProps) => props.position.x + "px"};
  top: ${(props: TokenWrapperProps) => props.position.y + "px"};
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colours.lightGrey};
  border-radius: 6px;
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
  margin: 10px;
  gap: 30px;
`;

export function Token({ token }: Props) {
  return (
    <Draggable handle={".header"} onDrag={() => (window as any).redraw()}>
      <TokenWrapper position={token.position}>
        <TokenHeader className="header">{token.fn.name}</TokenHeader>
        <TokenBody>
          <TokenInput input={token.sockets} />
          <TokenOutput output={token.plugs} />
        </TokenBody>
      </TokenWrapper>
    </Draggable>
  );
}
