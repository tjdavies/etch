import React, { useState } from "react";
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
import { DataInput } from "./DataInput";
import { ISocket } from "../../../model/Sockets";
import { observer } from "mobx-react-lite";

const InputWrapper = styled.div`
  position: relative;
  color: ${Colours.darkText};
  display: flex;
  align-items: center;
  flex-direction: ${(props: SocketProps) =>
    props.socket ? "row-reverse" : "row"};
  height: 20px;
  width: 100%;
  opacity: ${(props: SocketProps) => (props.fade ? "0.5" : "1")};
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
  socket?: boolean;
  fade: boolean;
}

interface InputProps {
  socket?: boolean;
  editable?: boolean;
  path: ISocket;
  expanded?: boolean;
  expandable: boolean;
  onToggleExpanded?: () => void;
}

const Value = styled.div`
  position: absolute;
  display: block;
  right: 100%;
  top: -2px;
  padding: 2px;
  margin-right: 26px;
  border: 1px solid ${Colours.primary};
  color: inherit;
  input {
    text-align: right;
  }
  background-color: ${Colours.background};
`;

export const ParamLabel = observer(
  ({
    path,
    editable,
    expanded,
    onToggleExpanded,
    expandable,
    socket,
  }: InputProps) => {
    const store = useStore();
    const [isDataInput, setIsDataInput] = useState(false);

    const fade: boolean =
      (socket &&
        store.activeDrag &&
        path.param.type.name !== "through" &&
        store.activeDrag?.param.type !== path.param.type) ||
      false;

    const onSetValue = (value: string) => {
      if (value !== "" && !isNaN(Number(value))) {
        path.target.addValue(path.path, Number(value));
      } else {
        path.target.removeValue(path.path);
      }
    };

    return (
      <InputWrapper
        socket={socket}
        fade={fade}
        onMouseOver={() => !fade && store.setActiveSocket(path)}
        onMouseOut={() => !fade && store.setActiveSocket(undefined)}
      >
        {editable && (
          <Options
            align={socket ? "right" : "left"}
            onDelete={() => path.param.delete()}
          />
        )}

        <LabelWrapper socket={socket} fade={fade}>
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
        {path.value !== undefined && !isDataInput && (
          <Value onClick={() => setIsDataInput(true)}>{path.value}</Value>
        )}
        {isDataInput && (
          <DataInput
            value={path.value !== undefined ? path.value + "" : undefined}
            onEnter={(value) => {
              onSetValue(value);
              setIsDataInput(false);
            }}
          />
        )}
        {!expanded && (
          <>
            {path.params?.map((p) => (
              <BlankConnector socket={socket} id={p.path} fade={fade} />
            ))}
          </>
        )}
        {socket ? (
          <ToConnector
            socket={path}
            onClick={() => setIsDataInput(true)}
            filled={path.value !== undefined}
            colour={path.param.type.colour}
          />
        ) : (
          <FromConnector path={path} />
        )}
      </InputWrapper>
    );
  }
);
