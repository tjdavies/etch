import React, { useState } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { ToConnector } from "./ToConnector";
import { observer } from "mobx-react-lite";
import { InlineEdit } from "../../common/InlineEdit";
import { useStore } from "../../../model/Store";
import { DataInput } from "./DataInput";
import { ISocket } from "../../../model/Sockets";

const InputLabel = styled.div`
  position: relative;
  color: ${Colours.darkText};
  display: flex;
  gap: 5px;
  user-select: none;
`;

interface Props {
  editable?: boolean;
  path: ISocket;
}

export const ToType = observer(({ path, editable }: Props) => {
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
            const v = value !== "" && Number(value);
            if (value !== "") {
              path.target.addValue(path.path, Number(v));
            } else {
              path.target.removeValue(path.path);
            }
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
