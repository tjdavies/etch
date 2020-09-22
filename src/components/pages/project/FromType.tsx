import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { FromConnector } from "./FromConnector";

import { InlineEdit } from "../../common/InlineEdit";
import { IPlug } from "../../../model/Plug";

import { TypeIconBox } from "./TypeIcon";
import { FormDown, FormNext } from "grommet-icons";
import { AddParam } from "./AddParam";
import { OptionsIcon } from "./OptionsIcon";

const InputWrapper = styled.div`
  position: relative;
  color: ${Colours.darkText};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 20px;
  width: 100%;
`;

const LabelWrapper = styled.div`
  display: flex;
  gap: 6px;
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
  flex-direction: row-reverse;
  right: -29px;
  width: 50px;
  top: 6px;
  z-index: -1;
`;

const ConnectorCircle = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 50%;
  margin-left: -6px;
  background-color: ${Colours.primary};
`;

const BlankConnector = styled.div`
  position: absolute;
  top: 6px;
  right: -10px;
  width: 2px;
  height: 2px;
  margin-left: 0px;
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
    <InputWrapper>
      <OptionsIcon />
      <LabelWrapper>
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
      </LabelWrapper>
      {!expanded && (
        <>
          <ListConnectorWrapper>
            {path.params?.map((p) => (
              <ConnectorCircle />
            ))}
          </ListConnectorWrapper>
          {path.params?.map((p) => (
            <BlankConnector id={p.path} />
          ))}
        </>
      )}
      <FromConnector path={path} />
    </InputWrapper>
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
