import React, { useState } from "react";
import styled from "styled-components";
import { FunctionInput } from "./FunctionInput";
import { FunctionOutput } from "./FunctionOutput";
import { IFn } from "../../../model/Fn";
import { Wires } from "./wires/Wires";
import { TokenDropDown } from "./TokenDropDown";
import { Point } from "../../../types/types";
import { Token } from "./tokens/Token";

const FunctionViewWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  content: " ";
`;

interface Props {
  fn: IFn;
}

export function FunctionView({ fn }: Props) {
  const [showTokenDropdown, setShowTokenDropdown] = useState<Point | null>(
    null
  );
  return (
    <FunctionViewWrapper>
      <BackGround
        onDoubleClick={(e) => setShowTokenDropdown({ x: e.pageX, y: e.pageY })}
      />
      {fn.tokens.map((t) => (
        <Token key={t.id} token={t} />
      ))}

      <FunctionInput input={fn.plugs} />
      <FunctionOutput output={fn.sockets} />
      <Wires />
      {showTokenDropdown && (
        <TokenDropDown
          position={showTokenDropdown}
          onClose={() => setShowTokenDropdown(null)}
        />
      )}
    </FunctionViewWrapper>
  );
}
