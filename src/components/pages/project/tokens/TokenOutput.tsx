import React from "react";
import styled from "styled-components";
import { FromType } from "../FromType";
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
      {output.map((param) => (
        <FromType key={param.id} param={param} />
      ))}
    </OutputWrapper>
  );
}
