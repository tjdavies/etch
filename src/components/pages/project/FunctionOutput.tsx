import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { ToType } from "./ToType";
import { IPath } from "../../../model/Path";
import { AddParam } from "./AddParam";

const OutputBox = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${Colours.lightGrey};
  width: 120px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  padding: 10px;
  background-color: ${Colours.white};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

interface Props {
  output: IPath[];
}

export function FunctionOutput({ output }: Props) {
  return (
    <OutputBox>
      {output.map((param) => (
        <ToType key={param.path} path={param} />
      ))}
      <AddParam isInput={false} />
    </OutputBox>
  );
}
