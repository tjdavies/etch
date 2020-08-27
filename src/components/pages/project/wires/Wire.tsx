import React from "react";
import { Point } from "../../../../types/types";

interface Props {
  from: Point;
  to: Point;
}

export function Wire({ from, to }: Props) {
  const x1 = from.x;
  const y1 = from.y;
  const x2 = to.x;
  const y2 = to.y;
  const hoz = x2 - x1;

  return (
    <path
      d={`M ${x1} ${y1} h ${hoz / 2} v ${y2 - y1} h ${hoz / 2}`}
      fill="none"
    />
  );
}
