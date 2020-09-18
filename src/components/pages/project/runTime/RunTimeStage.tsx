import React from "react";
import useDimensions from "react-use-dimensions";

import { Stage, Rect, Layer } from "react-konva";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  background-color: white;
`;

export interface IScene {
  scenex: number;
  sceney: number;
  width: number;
  height: number;
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
          {scene && (
            <Rect
              x={scene.scenex}
              y={scene.sceney}
              width={scene.width}
              height={scene.height}
              fill="red"
            />
          )}
        </Layer>
      </Stage>
    </Box>
  );
};
