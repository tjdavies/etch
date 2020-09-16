import React from "react";
import styled from "styled-components";
import { FromType } from "../FromType";
import { IPath } from "../../../../model/Path";
import { pathOr } from "ramda";

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
      {output.map((path) => (
        <FromType key={path.path} path={path} />
      ))}
    </OutputWrapper>
  );
}
