import React from "react";
import styled from "styled-components";
import { IParam } from "../../../../model/Param";
import { FromType } from "../FromType";

const OutputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

interface Props {
  parentId: string;
  output: IParam[];
}

export function TokenOutput({ output, parentId }: Props) {
  return (
    <OutputWrapper>
      {output.map((param) => (
        <FromType key={param.id} param={param} parentId={parentId} />
      ))}
    </OutputWrapper>
  );
}
