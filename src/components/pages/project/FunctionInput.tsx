import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { IPlug } from "../../../model/Plug";
import { useStore } from "../../../model/Store";
import { ParamView } from "./ParamView";
import { AddParam } from "./AddParam";

const InputBox = styled.div`
  position: relative;
  display: flex;
  z-index: 2;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  border: 1px solid ${Colours.lightGrey};
  min-width: 120px;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  padding: 6px;
  padding-right: 1px;
  background-color: ${Colours.white};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

interface Props {
  editable: boolean;
  input: IPlug[];
}

export const FunctionInput = ({ input, editable }: Props) => {
  const store = useStore();

  return (
    <InputBox>
      {input.map((path) => (
        <ParamView
          key={path.path}
          path={path}
          editable={editable}
          socket={false}
          editableTypes
        />
      ))}
      {editable && (
        <AddParam
          onSelect={store.activeFunction.addInputParam}
          onCreateNew={store.activeFunction.createNewInputType}
        />
      )}
    </InputBox>
  );
};
