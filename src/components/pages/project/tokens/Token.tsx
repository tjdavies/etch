import React, { useState } from "react";
import styled from "styled-components";
import { IToken } from "../../../../model/Token";
import { Colours } from "../../../../Style";
import Draggable, { DraggableData } from "react-draggable";
import { TokenInput } from "./TokenInput";
import { TokenOutput } from "./TokenOutput";
import { Share, Close } from "grommet-icons";
import { useStore } from "../../../../model/Store";
import { useHistory, generatePath } from "react-router-dom";
import { Routes } from "../../../../Routes";
import { observer } from "mobx-react-lite";
import { ChooseType } from "../ChooseType";

const TokenWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: ${Colours.white};
`;

const TokenHeader = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${(p: { isCore: boolean }) =>
    p.isCore ? Colours.secondary : Colours.primary};
  color: ${Colours.lightText};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  cursor: move;
  gap: 10px;
  user-select: none;
`;

const TokenBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 6px;
  padding-left: 1px;
  padding-right: 1px;
  gap: 30px;
  border: 1px solid ${Colours.lightGrey};
  border-top: none;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FnName = styled.span`
  font-weight: bold;
  margin-right: 0px;
`;

const ShareWrap = styled.div`
  margin-right: 4px;
  cursor: pointer;
`;

const HeaderDetails = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  token: IToken;
  onSelect: () => void;
}

export const Token = observer(({ token, onSelect }: Props) => {
  const history = useHistory();
  const store = useStore();
  const [dragStartPos, setDragStartPos] = useState<DraggableData | null>(null);

  const onOpenToken = () => {
    if (!token.fn.core) {
      history.push(
        generatePath(Routes.function, {
          id: store.project.id,
          fn: token.fn.id,
          context: token.id,
        })
      );
    }
  };

  const onTokenClick = () => {
    setDragStartPos(null);
  };

  const isDragging =
    dragStartPos &&
    (dragStartPos.x !== token.position.x ||
      dragStartPos.y !== token.position.y);

  return (
    <Draggable
      handle={".header"}
      onDrag={(e, data) => {
        token.setPosition({ x: data.x, y: data.y });
      }}
      onStart={(e, data) => setDragStartPos(data)}
      position={token.position}
    >
      <TokenWrapper onClick={onTokenClick}>
        <TokenHeader className="header" isCore={token.fn.core}>
          <HeaderDetails>
            {!token.fn.core && (
              <ShareWrap onClick={!isDragging ? onOpenToken : () => null}>
                <Share color="white" size="small" />
              </ShareWrap>
            )}
            <FnName>{token.fn.name}</FnName>
            {token.type && (
              <ChooseType type={token.type} onSelect={token.setSelectedType} />
            )}
          </HeaderDetails>
          <CloseButton onClick={!isDragging ? token.remove : () => null}>
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
});
