import React from "react";
import styled from "styled-components";
import { FunctionInput } from "./FunctionInput";
import { FunctionOutput } from "./FunctionOutput";
import { Connector } from "./Connector";
import { DragWire } from "./DragWire";
import { IFn } from "../../../model/Fn";

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
      <svg style={{ position: "absolute" }} height="100%" width="100%">
        <DragWire />
        {fn.connections.map((c) => (
          <Connector key={c.id} from={c.from} to={c.to} />
        ))}
      </svg>
      <FunctionInput input={fn.input} refName={"from." + fn.id} />
      <FunctionOutput types={fn.output} refName={"to." + fn.id} />
    </FunctionViewWrapper>
  );
}
