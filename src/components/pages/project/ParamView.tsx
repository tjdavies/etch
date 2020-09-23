import React from "react";
import styled from "styled-components";
import { IPlug } from "../../../model/Plug";
import { Colours } from "../../../Style";
import { AddParam } from "./AddParam";
import { ParamLabel } from "./ParamLabel";

interface Props {
  depth?: number;
  socket?: boolean;
  editable?: boolean;
  editableTypes?: boolean;
  path: IPlug;
}

interface SocketProps {
  socket?: boolean;
}

const NestWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${(props: SocketProps) =>
    !props.socket ? "flex-end" : "flex-start"};
  gap: 4px;
  margin-right: ${(props: SocketProps) => !props.socket && "5px"};
  margin-left: ${(props: SocketProps) => props.socket && "5px"};
  border-right: 1px solid #c4c4c460;
`;

export function ParamView({ depth = 0, ...props }: Props) {
  if (props.path.params) {
    return <RecordType {...props} depth={depth} expandable={true} />;
  }
  return <ParamLabel {...props} depth={depth} expandable={false} />;
}

interface InputProps extends Props {
  expanded?: boolean;
  expandable: boolean;
  onToggleExpanded?: () => void;
}

function RecordType({
  path,
  editable,
  socket,
  editableTypes,
  depth = 0,
}: InputProps) {
  const isEditableType = !path.param.type.core;
  const isEditable = editableTypes && isEditableType;
  return (
    <>
      <ParamLabel
        depth={depth}
        path={path}
        expanded={path.expanded}
        editable={editable}
        expandable={true}
        onToggleExpanded={() =>
          path.expanded
            ? path.target.shrinkParam(path.path)
            : path.target.expandParam(path.path)
        }
        socket={socket}
      />
      {path.expanded && (
        <NestWrapper socket={socket}>
          {path.params?.map((p) => (
            <ParamView
              path={p}
              editable={isEditable}
              socket={socket}
              editableTypes={editableTypes}
              depth={depth + 1}
            />
          ))}
          {isEditable && (
            <AddParam
              param={path.param}
              onSelect={path.param.type.addParam}
              onCreateNew={path.param.type.createNewType}
            />
          )}
        </NestWrapper>
      )}
    </>
  );
}
