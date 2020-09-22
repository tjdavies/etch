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
`;

/*
const Indented = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  margin-right: 5px;
  width: 100%;
`;
*/

interface Props {
  editable?: boolean;
  expanded?: boolean;
  path: IPlug;
  onToggleExpanded?: () => void;
}

export function FromType({ path, editable }: Props) {
  if (path.params) {
    return <RecordType path={path} editable={editable} />;
  }
  return <Input path={path} editable={editable} />;
}

function Input({ path, editable }: Props) {
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
      <FromConnector path={path} />
    </InputLabel>
  );
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

function ExpandableInput({
  path,
  editable,
  expanded,
  onToggleExpanded,
}: Props) {
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
      <TypeIconBox onClick={() => onToggleExpanded && onToggleExpanded()}>
        {expanded ? <FormDown size="small" /> : <FormNext size="small" />}
      </TypeIconBox>
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
      <ExpandableInput
        path={path}
        expanded={path.expanded}
        editable={editable}
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
