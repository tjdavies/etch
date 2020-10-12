import React, { useEffect, useRef, useState } from "react";
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
import { IToken } from "../../../model/Token";
import { SelectionTools } from "./SelectionTools";
import Selection from "react-ds";
import { Colours } from "../../../Style";

const FunctionViewWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .react-ds-border {
    background: #8fcfd110 !important;
    border: 1px dashed ${Colours.darkText} !important;
  }
  overflow: none;
`;

const Inputs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
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
  const backgroundRef = useRef(null);
  const itemsRef = React.useRef<any[]>([]);

  const [selectedTokens, setSelectedTokens] = useState<Record<string, boolean>>(
    {}
  );

  useKeysDown((keys) => {
    store.setInput({ keysDown: keys });
  });

  const selectToken = (token: IToken) => {
    setSelectedTokens({ ...selectedTokens, [token.id]: true });
  };

  const onSelectionChanged = (selectedIndex: number[]) => {
    const selectedTokenList = selectedIndex.map((index) => fn.tokens[index]);
    const selectedTokenMap = selectedTokenList.reduce(
      (acc: Record<string, boolean>, value) => {
        acc[value.id] = true;
        return acc;
      },
      {}
    );
    setSelectedTokens(selectedTokenMap);
  };

  const [isReady, setIsReady] = useState(false);
  const l = fn.tokens.length;
  useEffect(() => {
    if (backgroundRef.current && itemsRef.current.length === l) {
      setIsReady(true);
    }
  }, [l]);

  useEffect(() => {
    setSelectedTokens({});
  }, [fn.id]);

  return (
    <FunctionViewWrapper>
      {isReady && (
        <Selection
          target={backgroundRef.current}
          elements={itemsRef.current}
          onSelectionChange={onSelectionChanged}
        />
      )}

      <BackGround
        ref={backgroundRef}
        onDoubleClick={(e) => setShowTokenDropdown({ x: e.pageX, y: e.pageY })}
      />

      {fn.tokens.map((t: IToken, index) => (
        //@ts-ignore
        <Token
          ref={(el) => (itemsRef.current[index] = el)}
          key={t.id}
          token={t}
          onSelect={() => selectToken(t)}
          isSelected={selectedTokens[t.id]}
        />
      ))}

      <Inputs>
        <FunctionInput input={fn.plugs} editable={fn.isMain} />
        <FunctionOutput output={fn.sockets} editable={fn.isMain} />
      </Inputs>
      <Wires />
      {Object.keys(selectedTokens).length > 0 && (
        <SelectionTools
          onMakeFunction={() => {
            fn.generateFunction(Object.keys(selectedTokens));
            setSelectedTokens({});
          }}
          onDuplicate={() => {
            fn.cloneTokens(Object.keys(selectedTokens));
            setSelectedTokens({});
          }}
        />
      )}
      {showTokenDropdown && (
        <TokenDropDown
          position={showTokenDropdown}
          onClose={() => setShowTokenDropdown(null)}
        />
      )}
    </FunctionViewWrapper>
  );
});
