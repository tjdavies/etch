import React from "react";
import { IPlug } from "../../../model/Plug";
import { AddParam } from "./AddParam";
import { ParamLabel } from "./ParamLabel";

interface Props {
  depth?: number;
  socket?: boolean;
  editable?: boolean;
  editableTypes?: boolean;
  path: IPlug;
}

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
      {path.expanded &&
        path.params?.map((p) => (
          <ParamView
            path={p}
            editable={isEditable}
            socket={socket}
            editableTypes={editableTypes}
            depth={depth + 1}
          />
        ))}
      {isEditable && path.expanded && (
        <AddParam
          onSelect={path.param.type.addParam}
          onCreateNew={path.param.type.createNewType}
        />
      )}
    </>
  );
}
