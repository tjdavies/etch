import React from "react";
import useDimensions from "react-use-dimensions";

import { Stage, Rect, Layer, Text, Image } from "react-konva";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 4px;
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
        x={thing.rectx}
        y={thing.recty}
        width={thing.rectwidth}
        height={thing.rectheight}
        fill={thing.rectcolour}
      />
    );
  }
  if (thing.type === "text") {
    return (
      <Text
        x={thing.textx}
        y={thing.texty}
        text={thing.text}
        fill={thing.textcolour}
        fontSize={thing.fontSize}
      />
    );
  }
  if (thing.type === "image") {
    const I = new window.Image();
    I.src = thing.imageSrc;
    return (
      <Image
        x={thing.imagex}
        y={thing.imagey}
        width={thing.imagewidth}
        height={thing.imageheight}
        image={I}
      />
    );
  }
  return null;
};
