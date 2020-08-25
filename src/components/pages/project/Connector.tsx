import React, { useEffect, useState, useLayoutEffect } from "react";

import { useWindowSize } from "../../../utils/hooks/useWindowSize";
import { Colours } from "../../../Style";
import { Wire } from "./Wire";

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
    return (
      <Wire
        from={{ x: aPos.x + 10, y: aPos.y + 5 }}
        to={{ x: bPos.x, y: bPos.y + 10 }}
      />
    );
  }
  return null;
}

function getLocation(id: string) {
  return document.getElementById(id)?.getBoundingClientRect();
}
