import React from "react";
import styled from "styled-components";
import { ToType } from "../ToType";
import { IPath } from "../../../../model/Path";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

interface Props {
  input: IPath[];
}

export function TokenInput({ input }: Props) {
  return (
    <InputWrapper>
      {input.map((param) => (
        <ToType key={param.path} path={param} />
      ))}
    </InputWrapper>
  );
}
