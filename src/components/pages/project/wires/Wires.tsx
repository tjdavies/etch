import React, { useState, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { Connector } from "../Connector";
import { Colours } from "../../../../Style";
import { useStore } from "../../../../model/Store";
import { useWindowSize } from "../../../../utils/hooks/useWindowSize";

export const Wires = observer(() => {
  const { activeFunction } = useStore();
  const [date, setDate] = useState(new Date());
  const size = useWindowSize();

  useEffect(() => {
    setDate(new Date());
  }, [size]);

  (window as any).redraw = () => {
    setDate(new Date());
  };

  return (
    <svg
      style={{ position: "absolute", pointerEvents: "none" }}
      height="100%"
      width="100%"
      fill={Colours.primary}
      stroke={Colours.primary}
    >
      {activeFunction?.wires.map((c) => {
        return <Connector key={c.id} from={c.from} to={c.to} />;
      })}
      {activeFunction?.plugs.map((c) => {
        return <Connector key={c.id} from={c.id} to={c.id} />;
      })}
    </svg>
  );
});
