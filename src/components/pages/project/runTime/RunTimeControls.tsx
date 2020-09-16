import React from "react";
import styled from "styled-components";
import { Colours } from "../../../../Style";

import { PauseFill, PlayFill, StopFill } from "grommet-icons";

const RunTimeControlBox = styled.div`
  align-items: center;
  display: flex;
  gap: 5px;
`;

const ControlButton = styled.div`
  cursor: pointer;
`;

interface Props {
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  onPause: () => void;
}

export const RunTimeControls = ({
  isPlaying,
  onPlay,
  onStop,
  onPause,
}: Props) => {
  return (
    <RunTimeControlBox>
      <ControlButton onClick={onStop}>
        <StopFill color={Colours.lightText} size="small" />
      </ControlButton>
      {isPlaying ? (
        <ControlButton onClick={onPause}>
          <PauseFill color={Colours.lightText} size="small" />
        </ControlButton>
      ) : (
        <ControlButton onClick={onPlay}>
          <PlayFill color={Colours.lightText} size="small" />
        </ControlButton>
      )}
    </RunTimeControlBox>
  );
};
