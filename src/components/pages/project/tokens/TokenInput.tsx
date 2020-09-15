import React from "react";
import styled from "styled-components";
import { ToType } from "../ToType";
import { ISocket } from "../../../../model/Fn";
import { observer } from "mobx-react-lite";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

interface Props {
  input: ISocket[];
}

export const TokenInput = observer(({ input }: Props) => {
  return (
    <InputWrapper>
      {input.map((param) => (
        <ToType key={param.path} path={param} />
      ))}
    </InputWrapper>
  );
});
