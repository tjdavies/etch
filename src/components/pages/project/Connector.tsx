import React, { useEffect, useState, useLayoutEffect } from "react";

import { useWindowSize } from "../../../utils/hooks/useWindowSize";
import { Colours } from "../../../Style";

interface Props {
  from: string;
  to: string;
}

export function Connector({ from, to }: Props) {
  const [aPos, setAPos] = useState();
  const [bPos, setBPos] = useState();

  const size = useWindowSize();

  useEffect(() => {
    updateLines();
  }, [size]);

  useLayoutEffect(() => {
    (window as any).dirty = updateLines;
  }, []);

  const updateLines = () => {
    setAPos(getLocation("from." + from));
    setBPos(getLocation("to." + to));
  };

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
          fill="none"
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
