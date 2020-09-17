import React from "react";
import { observer } from "mobx-react-lite";
import { Connector } from "../Connector";
import { Colours } from "../../../../Style";
import { useStore } from "../../../../model/Store";
import styled from "styled-components";

import { IWire } from "../../../../model/Wire";

const WireSVG = styled.svg`
  position: absolute;
  pointer-events: none;
  z-index: 0;
`;

export const Wires = observer(() => {
  const { activeFunction } = useStore();

  return (
    <WireSVG
      height="100%"
      width="100%"
      fill={Colours.primary}
      stroke={Colours.primary}
    >
      {activeFunction?.wires.map((c: IWire) => {
        return <Connector key={c.to.path} from={c.from} to={c.to} />;
      })}
    </WireSVG>
  );
});
