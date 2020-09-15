import React from "react";

import { Stage, Rect, Layer } from "react-konva";

interface Props {
  scene: { x: number; y: number; width: number; height: number } | null;
}

export const RunTimeStage = ({ scene }: Props) => {
  return (
    <Stage width={333.325} height={250}>
      <Layer>
        {scene && (
          <Rect
            x={scene.x}
            y={scene.y}
            width={scene.width}
            height={scene.height}
            fill="red"
          />
        )}
      </Layer>
    </Stage>
  );
};
