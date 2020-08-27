import React from "react";
import styled from "styled-components";
import { FunctionInput } from "./FunctionInput";
import { FunctionOutput } from "./FunctionOutput";
import { IFn } from "../../../model/Fn";
import { Wires } from "./Wires";

const FunctionViewWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

interface Props {
  fn: IFn;
}

export function FunctionView({ fn }: Props) {
  return (
    <FunctionViewWrapper>
      <FunctionInput input={fn.input} refName={"from." + fn.id} />
      <FunctionOutput output={fn.output} refName={"to." + fn.id} />
      <Wires />
    </FunctionViewWrapper>
  );
}
