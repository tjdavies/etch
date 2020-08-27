import React from "react";

import { observer } from "mobx-react-lite";
import { Connector } from "./Connector";
import { Colours } from "../../../Style";
import { useStore } from "../../../model/Store";

export const Wires = observer(() => {
  const { activeFunction } = useStore();
  return (
    <svg
      style={{ position: "absolute", pointerEvents: "none" }}
      height="100%"
      width="100%"
      fill={Colours.primary}
      stroke={Colours.primary}
    >
      {activeFunction?.connections.map((c) => {
        return <Connector key={c.id} from={c.from} to={c.to} />;
      })}
    </svg>
  );
});
