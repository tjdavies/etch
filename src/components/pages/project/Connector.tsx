import React, { useEffect, useState } from "react";

import { useWindowSize } from "../../../utils/hooks/useWindowSize";
import { Colours } from "../../../Style";

export function Connector() {
  const [aPos, setAPos] = useState();
  const [bPos, setBPos] = useState();

  const size = useWindowSize();

  useEffect(() => {
    // Update the document title using the browser API
    setAPos(getLocation("A"));
    setBPos(getLocation("B"));
  }, [size]);

  if (aPos && bPos) {
    const x1 = aPos.x + 10;
    const y1 = aPos.y + 5;
    const x2 = bPos.x;
    const y2 = bPos.y + 10;
    const hoz = x2 - x1;

    return (
      <>
        <path
          d={`M ${x1} ${y1} h ${hoz / 2} v ${y2 - y1} h ${hoz / 2}`}
          fill="transparent"
          stroke={Colours.secondary}
        />
      </>
    );
  }
  return null;
}

function getLocation(id: string) {
  return document.getElementById(id)?.getBoundingClientRect();
}
