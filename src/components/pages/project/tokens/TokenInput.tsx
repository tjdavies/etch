import React from "react";
import styled from "styled-components";
import { ToType } from "../ToType";
import { IParam } from "../../../../model/Param";
import { IPlug } from "../../../../model/Token";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

interface Props {
  input: IPlug[];
}

export function TokenInput({ input }: Props) {
  return (
    <InputWrapper>
      {input.map((param) => (
        <ToType key={param.id} param={param} />
      ))}
    </InputWrapper>
  );
}
