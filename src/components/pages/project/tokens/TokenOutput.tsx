import React from "react";
import styled from "styled-components";
import { FromType } from "../FromType";
import { IPath } from "../../../../model/Path";
import { pathOr } from "ramda";
import { IPlug } from "../../../../model/Plug";

const OutputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

interface Props {
  output: IPlug[];
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
