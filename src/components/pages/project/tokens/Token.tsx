import React from "react";
import styled from "styled-components";
import { IToken } from "../../../../model/Token";
import { Colours } from "../../../../Style";
import Draggable from "react-draggable";
import { TokenInput } from "./TokenInput";
import { TokenOutput } from "./TokenOutput";
import { Share, Close } from "grommet-icons";
import { useStore } from "../../../../model/Store";
import { useHistory, generatePath } from "react-router-dom";
import { Routes } from "../../../../Routes";

const TokenWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: ${Colours.white};
  user-select: none;
`;

const TokenHeader = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${Colours.primary};
  color: ${Colours.lightText};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  cursor: move;
  gap: 10px;
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

const CloseButton = styled.div`
  cursor: pointer;
`;

export function Token({ token }: Props) {
  const history = useHistory();
  const store = useStore();

  const onOpenToken = () => {
    if (!token.fn.core) {
      history.push(
        generatePath(Routes.function, {
          id: store.project.id,
          fn: token.fn.id,
        })
      );
    }
  };

  return (
    <Draggable
      handle={".header"}
      onDrag={(e, data) => {
        token.setPosition({ x: data.x, y: data.y });
        (window as any).redraw();
      }}
      position={token.position}
    >
      <TokenWrapper onDoubleClick={onOpenToken}>
        <TokenHeader className="header">
          <div>
            {!token.fn.core && <Share color="white" size="small" />}
            {token.fn.name}
          </div>
          <CloseButton onClick={token.remove}>
            <Close color="white" size="small" />
          </CloseButton>
        </TokenHeader>
        <TokenBody>
          <TokenInput input={token.sockets} />
          <TokenOutput output={token.plugs} />
        </TokenBody>
      </TokenWrapper>
    </Draggable>
  );
}
