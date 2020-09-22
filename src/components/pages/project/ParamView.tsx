import React from "react";
import { IPlug } from "../../../model/Plug";
import { AddParam } from "./AddParam";
import { ParamLabel } from "./ParamLabel";

interface Props {
  socket: boolean;
  editable?: boolean;
  editableTypes?: boolean;
  path: IPlug;
}

export function ParamView(props: Props) {
  if (props.path.params) {
    return <RecordType {...props} expandable={true} />;
  }
  return <ParamLabel {...props} expandable={false} />;
}

interface InputProps extends Props {
  expanded?: boolean;
  expandable: boolean;
  onToggleExpanded?: () => void;
}

function RecordType({ path, editable, socket, editableTypes }: InputProps) {
  const isEditableType = !path.param.type.core;
  const isEditable = editableTypes && isEditableType;
  return (
    <>
      <ParamLabel
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
          <ParamView path={p} editable={isEditable} socket={socket} />
        ))}
      {isEditable && path.expanded && (
        <AddParam onSelect={path.param.type.addParam} />
      )}
    </>
  );
}
