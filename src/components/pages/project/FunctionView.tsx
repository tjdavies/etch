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
        {fn.connections.map((c, i) => (
          <Connector key={i} from={c.from} to={c.to} />
        ))}
      </svg>
      <FunctionInput input={fn.input} refName="from.this" />
      <FunctionOutput types={fn.output} />
    </FunctionViewWrapper>
  );
}
