import React from "react";
import useDimensions from "react-use-dimensions";

import { Stage, Rect, Layer } from "react-konva";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  background-color: white;
`;

export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
  colour: string;
}

export interface IScene {
  children: IRect[];
}

interface Props {
  scene: IScene | null;
}

const stageWidth = 800;
const stageHeight = 600;

export const RunTimeStage = ({ scene }: Props) => {
  const [ref, { width }] = useDimensions();

  const scale = width / stageWidth;
  return (
    <Box ref={ref}>
      <Stage
        width={stageWidth * scale}
        height={stageHeight * scale}
        scale={{ x: scale, y: scale }}
      >
        <Layer>
          {scene &&
            scene.children.map((rect) => (
              <Rect
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill={rect.colour}
              />
            ))}
        </Layer>
      </Stage>
    </Box>
  );
};
