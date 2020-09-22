import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { FromConnector } from "./FromConnector";

import { InlineEdit } from "../../common/InlineEdit";
import { IPlug } from "../../../model/Plug";

import { TypeIconBox } from "./TypeIcon";
import { FormDown, FormNext } from "grommet-icons";
import { AddParam } from "./AddParam";

const InputLabel = styled.div`
  position: relative;
  color: ${Colours.darkText};
  display: flex;
  align-items: flex-start;
  gap: 5px;
  height: 20px;
  max-width: 100px;
`;

interface Props {
  editable?: boolean;
  path: IPlug;
}

export function FromType({ path, editable }: Props) {
  if (path.params) {
    return <RecordType path={path} editable={editable} />;
  }
  return <Input path={path} editable={editable} expandable={false} />;
}

const ListConnectorWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: -30px;
  top: 6px;
  padding: 5px;
  z-index: -1;
`;

const ConnectorCircle = styled.div`
  border: 1px solid ${Colours.lightGrey};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-bottom: -6px;
  background-color: ${Colours.background};
`;

interface InputProps extends Props {
  expanded?: boolean;
  expandable: boolean;
  onToggleExpanded?: () => void;
}

function Input({
  path,
  editable,
  expanded,
  onToggleExpanded,
  expandable,
}: InputProps) {
  return (
    <InputLabel>
      {editable ? (
        <InlineEdit
          type="text"
          value={path.param.name}
          onSave={path.param.setName}
          buttonsAlign="before"
        />
      ) : (
        path.param.name
      )}
      {expandable && (
        <TypeIconBox onClick={() => onToggleExpanded && onToggleExpanded()}>
          {expanded ? <FormDown size="small" /> : <FormNext size="small" />}
        </TypeIconBox>
      )}
      {!expanded && (
        <ListConnectorWrapper>
          {path.params?.map((p) => (
            <ConnectorCircle id={p.path} />
          ))}
        </ListConnectorWrapper>
      )}
      <FromConnector path={path} />
    </InputLabel>
  );
}

function RecordType({ path, editable }: { path: IPlug; editable?: boolean }) {
  const isEditableType = !path.param.type.core;
  return (
    <>
      <Input
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
          <FromType path={p} editable={isEditableType} />
        ))}
      {isEditableType && path.expanded && (
        <AddParam onSelect={path.param.type.addParam} />
      )}
    </>
  );
}
