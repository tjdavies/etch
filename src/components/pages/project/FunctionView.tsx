import React from "react";
import styled from "styled-components";
import { FunctionInput } from "./FunctionInput";
import { HydratedFn } from "../../../State";
import { FunctionOutput } from "./FunctionOutput";
import { Connector } from "./Connector";

const FunctionViewWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

interface Props {
  fn: HydratedFn;
}

export function FunctionView({ fn }: Props) {
  return (
    <FunctionViewWrapper>
      <svg style={{ position: "absolute" }} height="100%" width="100%">
        <Connector />
      </svg>
      <FunctionInput input={fn.input} />
      <FunctionOutput types={fn.output} />
    </FunctionViewWrapper>
  );
}
