import React, { useState } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { ToConnector } from "./ToConnector";
import { observer } from "mobx-react-lite";
import { InlineEdit } from "../../common/InlineEdit";
import { useStore } from "../../../model/Store";
import { DataInput } from "./DataInput";
import { ISocket } from "../../../model/Sockets";
import { TypeIconBox } from "./TypeIcon";
import { FormDown, FormNext } from "grommet-icons";

const InputLabel = styled.div`
  position: relative;
  color: ${Colours.darkText};
  display: flex;
  gap: 5px;
  user-select: none;
`;

interface Props {
  expanded?: boolean;
  editable?: boolean;
  path: ISocket;
  onToggleExpanded?: () => void;
}

export const ToType = observer(({ path, editable }: Props) => {
  const onSetValue = (value: string) => {
    if (value !== "" && !isNaN(Number(value))) {
      path.target.addValue(path.path, Number(value));
    } else {
      path.target.removeValue(path.path);
    }
  };

  if (path.params) {
    return <RecordType path={path} onSetValue={onSetValue} />;
  }
  return <Input path={path} editable={editable} onSetValue={onSetValue} />;
});

interface LocalProp extends Props {
  onSetValue: (value: string) => void;
}

const Input = observer(({ path, editable, onSetValue }: LocalProp) => {
  const store = useStore();
  const [isDataInput, setIsDataInput] = useState(false);
  return (
    <InputLabel
      onMouseOver={() => store.setActiveSocket(path)}
      onMouseOut={() => store.setActiveSocket(undefined)}
    >
      <ToConnector
        socket={path}
        onClick={() => setIsDataInput(true)}
        filled={path.value !== undefined}
      />
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
      {editable ? (
        <InlineEdit
          type="text"
          value={path.param.name}
          onSave={path.param.setName}
        />
      ) : (
        path.param.name
      )}
    </InputLabel>
  );
});

const ListConnectorWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: -30px;
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

const ExpandableInput = observer(
  ({ path, editable, onToggleExpanded, expanded, onSetValue }: LocalProp) => {
    const store = useStore();
    const [isDataInput, setIsDataInput] = useState(false);
    return (
      <InputLabel
        onMouseOver={() => store.setActiveSocket(path)}
        onMouseOut={() => store.setActiveSocket(undefined)}
      >
        <ToConnector
          socket={path}
          onClick={() => setIsDataInput(true)}
          filled={path.value !== undefined}
        />
        {!expanded && (
          <ListConnectorWrapper>
            {path.params?.map((p) => (
              <ConnectorCircle id={p.path} />
            ))}
          </ListConnectorWrapper>
        )}
        {path.value !== undefined && !isDataInput && (
          <Value onClick={() => setIsDataInput(true)}>{path.value}</Value>
        )}
        <TypeIconBox onClick={() => onToggleExpanded && onToggleExpanded()}>
          {expanded ? <FormDown size="small" /> : <FormNext size="small" />}
        </TypeIconBox>
        {isDataInput && (
          <DataInput
            value={path.value !== undefined ? path.value + "" : undefined}
            onEnter={(value) => {
              onSetValue(value);
              setIsDataInput(false);
            }}
          />
        )}
        {editable ? (
          <InlineEdit
            type="text"
            value={path.param.name}
            onSave={path.param.setName}
          />
        ) : (
          path.param.name
        )}
      </InputLabel>
    );
  }
);

function RecordType({ path, onSetValue }: LocalProp) {
  return (
    <>
      <ExpandableInput
        path={path}
        expanded={path.expanded}
        onToggleExpanded={() =>
          path.expanded
            ? path.target.shrinkParam(path.path)
            : path.target.expandParam(path.path)
        }
        onSetValue={onSetValue}
      />

      {path.expanded && path.params?.map((p) => <ToType path={p} />)}
    </>
  );
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
