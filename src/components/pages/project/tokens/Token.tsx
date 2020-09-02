import React, { useState } from "react";
import styled from "styled-components";
import { IToken } from "../../../../model/Token";
import { Point } from "../../../../types/types";
import { Colours } from "../../../../Style";
import Draggable from "react-draggable";
import { FunctionInput } from "../FunctionInput";
import { TokenInput } from "./TokenInput";

interface TokenWrapperProps {
  position: Point;
}

const TokenWrapper = styled.div`
  position: absolute;
  left: ${(props: TokenWrapperProps) => props.position.x + "px"};
  top: ${(props: TokenWrapperProps) => props.position.y + "px"};
  display: flex;
  flex-direction: column;
  width: 200px;
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
`;

interface Props {
  token: IToken;
}

const TokenBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

export function Token({ token }: Props) {
  return (
    <Draggable onDrag={() => (window as any).redraw()}>
      <TokenWrapper position={token.position}>
        <TokenHeader>{token.fn.name}</TokenHeader>
        <TokenBody>
          <TokenInput input={token.fn.input} />
        </TokenBody>
      </TokenWrapper>
    </Draggable>
  );
}
