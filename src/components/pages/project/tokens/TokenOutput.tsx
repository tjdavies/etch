import React from "react";
import styled from "styled-components";
import { FromType } from "../FromType";
import { IPath } from "../../../../model/Path";

const OutputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

interface Props {
  output: IPath[];
}

export function TokenOutput({ output }: Props) {
  return (
    <OutputWrapper>
      {output.map((param) => (
        <FromType key={param.path} param={param} />
      ))}
    </OutputWrapper>
  );
}
