import React, { useState } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { FromConnector } from "./FromConnector";
import { InlineEdit } from "../../common/InlineEdit";
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
  flex-direction: ${(props: WrapperProps) =>
    props.socket ? "row-reverse" : "row"};
  height: 20px;
  width: 100%;
  opacity: ${(props: WrapperProps) => (props.fade ? "0.3" : "1")};
`;

const LabelWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: ${(props: SocketProps) =>
    props.socket ? "row-reverse" : "row"};
  justify-content: flex-end;
  user-select: none;
`;

const BlankConnector = styled.div`
  position: absolute;
  width: 2px;
  height: 50%;
`;

export const ConnectorWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  right: ${(props: ConnectorWrapperProps) => props.socket && "100%"};
  left: ${(props: ConnectorWrapperProps) => !props.socket && "100%"};
  padding-right: ${(props: ConnectorWrapperProps) =>
    props.socket && getIndent(props.depth)};
  padding-left: ${(props: ConnectorWrapperProps) =>
    !props.socket && getIndent(props.depth)};
`;

function getIndent(depth: number) {
  return depth * 6 + 10 + "px";
}

interface SocketProps {
  socket?: boolean;
}

interface WrapperProps extends SocketProps {
  fade: boolean;
}

interface ConnectorWrapperProps extends SocketProps {
  depth: number;
}

interface InputProps {
  socket?: boolean;
  editable?: boolean;
  path: ISocket;
  expanded?: boolean;
  expandable: boolean;
  depth: number;
  onToggleExpanded?: () => void;
}

export const ParamLabel = observer(
  ({
    path,
    editable,
    expanded,
    onToggleExpanded,
    expandable,
    socket,
    depth,
  }: InputProps) => {
    const store = useStore();
    const [isDataInput, setIsDataInput] = useState(false);

    const fade: boolean =
      (socket &&
        store.activeDrag &&
        store.activeDrag?.param.type !== path.type) ||
      false;

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
            onDelete={() => store.project.deletePath(path)}
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
          {!expandable && <TypeIconBox />}
        </LabelWrapper>

        <ConnectorWrapper socket={socket} depth={depth}>
          {(isDataInput || path.value !== undefined) && (
            <DataInput
              type={path.param.type.id}
              value={path.value !== undefined ? path.value + "" : undefined}
              onEnter={(value) => {
                path.target.addValue(path.path, value);
                setIsDataInput(false);
              }}
              onRemoveValue={() => {
                path.target.removeValue(path.path);
                setIsDataInput(false);
              }}
            />
          )}
          {!expanded && (
            <>
              {getAppParams(path).map((p) => (
                <BlankConnector key={p.path} id={p.path} />
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
        </ConnectorWrapper>
      </InputWrapper>
    );
  }
);

function getAppParams(socket: ISocket): ISocket[] {
  if (socket.params) {
    return socket.params.flatMap((p: ISocket) => {
      return getAppParams(p);
    });
  } else {
    return [socket];
  }
}
