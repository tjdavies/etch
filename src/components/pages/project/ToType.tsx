import React, { useState } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { TypeIcon } from "./TypeIcon";
import { ToConnector } from "./ToConnector";
import { observer } from "mobx-react-lite";
import { IPath } from "../../../model/Path";
import { InlineEdit } from "../../common/InlineEdit";
import { useStore } from "../../../model/Store";
import { DataInput } from "./DataInput";
import { ISocket } from "../../../model/Fn";

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
      onClick={() => setIsDataInput(true)}
    >
      {path.value !== undefined && <Value>{path.value}</Value>}
      {isDataInput && (
        <DataInput
          onEnter={(value) => {
            const v = value !== "" && Number(value);
            if (value !== "") {
              store.activeFunction.addValue(path.path, Number(v));
            } else {
              store.activeFunction.removeValue(path.path);
            }
            setIsDataInput(false);
          }}
        />
      )}
      <ToConnector socket={path} />
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
  border: 1px solid ${Colours.lightGrey};
  color: inherit;
  input {
    text-align: right;
  }
`;
