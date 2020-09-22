import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { FromConnector } from "./FromConnector";

import { InlineEdit } from "../../common/InlineEdit";
import { IPlug } from "../../../model/Plug";

import { TypeIconBox } from "./TypeIcon";
import { FormDown, FormNext } from "grommet-icons";
import { Options } from "./Options";

const InputWrapper = styled.div`
  position: relative;
  color: ${Colours.darkText};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 20px;
  width: 100%;
`;

const LabelWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
`;

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

interface InputProps {
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
}: InputProps) {
  return (
    <InputWrapper>
      {editable && <Options onDelete={() => path.param.delete()} />}

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
