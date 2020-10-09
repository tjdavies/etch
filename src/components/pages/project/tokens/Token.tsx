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

  &:after {
    content: "";
    display: ${({ isSelected }: { isSelected: boolean }) =>
      isSelected ? "block" : "none"};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 4px;
    border: 2px dashed #34c6eb;
    pointer-events: none;
  }
`;

interface TokenHeaderProps {
  isCore: boolean;
  isSelected: boolean;
}

const TokenHeader = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${(p: TokenHeaderProps) =>
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
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border: 1px solid ${Colours.lightGrey};
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
  background-color: ${Colours.background};
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
  isSelected: boolean;
}

export const Token = observer(
  ({ token, onSelect, isSelected }: Props, ref) => {
    const history = useHistory();
    const store = useStore();
    const [dragStartPos, setDragStartPos] = useState<DraggableData | null>(
      null
    );

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
        <TokenWrapper ref={ref as any} isSelected={isSelected}>
          <TokenHeader
            isSelected={isSelected}
            className="header"
            isCore={token.fn.core}
            onDoubleClick={onOpenToken}
          >
            <HeaderDetails>
              {!token.fn.core && (
                <ShareWrap
                  onClick={!isDragging ? safeClick(onOpenToken) : () => null}
                >
                  <Share color="white" size="small" />
                </ShareWrap>
              )}
              <FnName>{token.fn.name}</FnName>
              {token.type && (
                <ChooseType
                  type={token.type}
                  onSelect={token.setSelectedType}
                />
              )}
            </HeaderDetails>
            <CloseButton
              onClick={!isDragging ? safeClick(token.remove) : () => null}
            >
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
  },
  {
    forwardRef: true,
  }
);

function safeClick(fn: () => void) {
  return (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    fn();
  };
}
