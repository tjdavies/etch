import React from "react";
import { IPlug } from "../../../model/Plug";
import { AddParam } from "./AddParam";
import { ParamLabel } from "./ParamLabel";

interface Props {
  socket: boolean;
  editable?: boolean;
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

function RecordType({ path, editable, socket }: InputProps) {
  const isEditableType = !path.param.type.core;
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
      />
      {path.expanded &&
        path.params?.map((p) => (
          <ParamView path={p} editable={isEditableType} socket={socket} />
        ))}
      {isEditableType && path.expanded && (
        <AddParam onSelect={path.param.type.addParam} />
      )}
    </>
  );
}
