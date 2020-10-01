import React from "react";
import useDimensions from "react-use-dimensions";

import { Stage, Rect, Layer, Text } from "react-konva";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  background-color: white;
`;

export interface IScene {
  children: any[];
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
            scene.children.map((rect, index) => (
              <Thing thing={rect} key={index} />
            ))}
        </Layer>
      </Stage>
    </Box>
  );
};

export const Thing = ({ thing }: { thing: any }) => {
  if (thing.type === "rect") {
    return (
      <Rect
        x={thing.x}
        y={thing.y}
        width={thing.width}
        height={thing.height}
        fill={thing.colour}
      />
    );
  }
  if (thing.type === "text") {
    return (
      <Text
        x={thing.x}
        y={thing.y}
        text={thing.text}
        fill={thing.colour}
        fontSize={thing.fontSize}
      />
    );
  }
  return null;
};
