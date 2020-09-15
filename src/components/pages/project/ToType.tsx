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

const InputLabel = styled.div`
  position: relative;
  color: ${Colours.darkText};
  display: flex;
  gap: 5px;
  user-select: none;
`;

interface Props {
  editable?: boolean;
  path: IPath;
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
      {isDataInput && <DataInput onEnter={() => setIsDataInput(false)} />}
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
