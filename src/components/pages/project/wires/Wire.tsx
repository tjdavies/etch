import React from "react";
import { Point } from "../../../../types/types";

interface Props {
  from: Point;
  to: Point;
  color: string;
}

export function Wire({ from, to, color }: Props) {
  const x1 = from.x;
  const y1 = from.y;
  const x2 = to.x;
  const y2 = to.y;
  // const hoz = x2 - x1;

  var dx = Math.abs(x2 - x1) * 0.67;

  var o2 = x1 + dx;
  var o3 = x2 - dx;
  var path = `M ${x1} ${y1} C ${o2} ${y1} ${o3} ${y2} ${x2} ${y2}`;
  // hoz path  `M ${x1} ${y1} h ${hoz / 2} v ${y2 - y1} h ${hoz / 2}`
  return (
    <>
      <path d={path} stroke={color} stroke-width="1" fill="none" />
    </>
  );
}
