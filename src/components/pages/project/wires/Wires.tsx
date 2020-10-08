import React from "react";
import { observer } from "mobx-react-lite";
import { Connector } from "../Connector";
import { Colours } from "../../../../Style";
import { useStore } from "../../../../model/Store";
import styled from "styled-components";

import { IWire } from "../../../../model/Wire";

const WireSVG = styled.svg`
  position: fixed;
  pointer-events: none;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
`;

export const Wires = observer(() => {
  const { activeFunction } = useStore();

  return (
    <WireSVG
      width="100%"
      height="100%"
      fill={Colours.primary}
      stroke={Colours.primary}
    >
      {activeFunction?.wires.map((c: IWire) => {
        return <Connector key={c.to.path} from={c.from} to={c.to} />;
      })}
    </WireSVG>
  );
});
