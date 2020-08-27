import React, { useState } from "react";
import styled from "styled-components";
import { IToken } from "../../../../model/Token";
import { Point } from "../../../../types/types";
import { Colours } from "../../../../Style";
import Draggable from "react-draggable";

interface TokenWrapperProps {
  position: Point;
}

const TokenWrapper = styled.div`
  position: absolute;
  left: ${(props: TokenWrapperProps) => props.position.x + "px"};
  top: ${(props: TokenWrapperProps) => props.position.y + "px"};
  display: flex;

  width: 200px;
  height: 200px;
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

export function Token({ token }: Props) {
  return (
    <Draggable>
      <TokenWrapper position={token.position}>
        <TokenHeader>{token.fn.name}</TokenHeader>
      </TokenWrapper>
    </Draggable>
  );
}
