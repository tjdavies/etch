import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { ToType } from "./ToType";
import { AddParam } from "./AddParam";
import { ISocket } from "../../../model/Sockets";
import { useStore } from "../../../model/Store";

const OutputBox = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${Colours.lightGrey};
  min-width: 120px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  padding: 6px;
  background-color: ${Colours.white};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

interface Props {
  editable: boolean;
  output: ISocket[];
}

export function FunctionOutput({ output, editable }: Props) {
  const store = useStore();
  return (
    <OutputBox>
      {output.map((param) => (
        <ToType
          key={param.path}
          path={param}
          editable={editable}
          editableTypes
        />
      ))}
      {editable && <AddParam onSelect={store.activeFunction.addOutputParam} />}
    </OutputBox>
  );
}
