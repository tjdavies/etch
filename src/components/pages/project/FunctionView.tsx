import React, { useState } from "react";
import styled from "styled-components";
import { FunctionInput } from "./FunctionInput";
import { FunctionOutput } from "./FunctionOutput";
import { IFn } from "../../../model/Fn";
import { Wires } from "./wires/Wires";
import { TokenDropDown } from "./TokenDropDown";
import { Point } from "../../../types/types";
import { Token } from "./tokens/Token";
import { observer } from "mobx-react-lite";
import { useKeysDown } from "../../../utils/hooks/useKeysDown";
import { useStore } from "../../../model/Store";

const FunctionViewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
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

export const FunctionView = observer(({ fn }: Props) => {
  const [showTokenDropdown, setShowTokenDropdown] = useState<Point | null>(
    null
  );

  const store = useStore();

  useKeysDown((keys) => {
    store.setInput({ keysDown: keys });
  });

  return (
    <FunctionViewWrapper>
      <BackGround
        onDoubleClick={(e) => setShowTokenDropdown({ x: e.pageX, y: e.pageY })}
      />
      {fn.tokens.map((t: any) => (
        <Token key={t.id} token={t} />
      ))}

      <FunctionInput input={fn.plugs} editable={fn.isMain} />
      <FunctionOutput output={fn.sockets} editable={fn.isMain} />
      <Wires />
      {showTokenDropdown && (
        <TokenDropDown
          position={showTokenDropdown}
          onClose={() => setShowTokenDropdown(null)}
        />
      )}
    </FunctionViewWrapper>
  );
});
