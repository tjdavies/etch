import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { FromConnector } from "./FromConnector";

import { InlineEdit } from "../../common/InlineEdit";
import { IPlug } from "../../../model/Plug";

import { TypeIconBox } from "./TypeIcon";
import { FormDown, FormNext } from "grommet-icons";
import { Options } from "./Options";
import { ToConnector } from "./ToConnector";
import { useStore } from "../../../model/Store";

const InputWrapper = styled.div`
  position: relative;
  color: ${Colours.darkText};
  display: flex;
  align-items: center;
  flex-direction: ${(props: SocketProps) =>
    props.socket ? "row-reverse" : "row"};
  height: 20px;
  width: 100%;
`;

const LabelWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: ${(props: SocketProps) =>
    props.socket ? "row-reverse" : "row"};
  justify-content: flex-end;

  gap: 6px;
`;

const BlankConnector = styled.div`
  position: absolute;
  top: 6px;

  right: ${(props: SocketProps) => (props.socket ? "" : "-10px")};
  left: ${(props: SocketProps) => (props.socket ? "-22px" : "")};
  width: 2px;
  height: 2px;
  margin-left: 0px;
`;

interface SocketProps {
  socket: boolean;
}

interface InputProps {
  socket: boolean;
  editable?: boolean;
  path: IPlug;
  expanded?: boolean;
  expandable: boolean;
  onToggleExpanded?: () => void;
}

export function ParamLabel({
  path,
  editable,
  expanded,
  onToggleExpanded,
  expandable,
  socket,
}: InputProps) {
  const store = useStore();
  return (
    <InputWrapper
      socket={socket}
      onMouseOver={() => socket && store.setActiveSocket(path)}
      onMouseOut={() => socket && store.setActiveSocket(undefined)}
    >
      {editable && (
        <Options
          align={socket ? "right" : "left"}
          onDelete={() => path.param.delete()}
        />
      )}

      <LabelWrapper socket={socket}>
        {editable ? (
          <InlineEdit
            type="text"
            value={path.param.name}
            onSave={path.param.setName}
            buttonsAlign={socket ? "after" : "before"}
          />
        ) : (
          path.param.name
        )}
        {expandable && (
          <TypeIconBox onClick={() => onToggleExpanded && onToggleExpanded()}>
            {expanded ? <FormDown size="small" /> : <FormNext size="small" />}
          </TypeIconBox>
        )}
      </LabelWrapper>
      {!expanded && (
        <>
          {path.params?.map((p) => (
            <BlankConnector socket={socket} id={p.path} />
          ))}
        </>
      )}
      {socket ? (
        <ToConnector socket={path} onClick={() => null} filled={false} />
      ) : (
        <FromConnector path={path} />
      )}
    </InputWrapper>
  );
}
