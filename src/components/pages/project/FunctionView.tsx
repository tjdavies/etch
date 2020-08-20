import React from "react";
import styled from "styled-components";
import { FunctionInput } from "./FunctionInput";
import { Fn } from "../../../State";
import { FunctionOutput } from "./FunctionOutput";

const FunctionViewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

interface Props {
  fn: Fn;
}

export function FunctionView({ fn }: Props) {
  return (
    <FunctionViewWrapper>
      <FunctionInput input={fn.input} />
      <FunctionOutput types={fn.output} />
    </FunctionViewWrapper>
  );
}
