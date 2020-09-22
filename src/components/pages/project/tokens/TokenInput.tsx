import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { ISocket } from "../../../../model/Sockets";
import { ParamView } from "../ParamView";

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
        <ParamView key={param.path} path={param} socket />
      ))}
    </InputWrapper>
  );
});
