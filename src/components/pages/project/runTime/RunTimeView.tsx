import React, { useState } from "react";
import styled from "styled-components";
import { Colours } from "../../../../Style";
import {
  useStore,
  calculateFunction,
  mapOutputToValues,
} from "../../../../model/Store";
import { Expand, Contract } from "grommet-icons";
import { RunTimeStage } from "./RunTimeStage";
import { RunTimeControls } from "./RunTimeControls";
import { useInterval } from "../../../../utils/hooks/useInterval";
import Draggable from "react-draggable";

const RunButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  right: 0px;
  padding: 5px;
  height: 30px;
  width: 30px;
  color: ${Colours.lightText};
  background-color: ${Colours.primary};
  border-top-left-radius: 10px;
  cursor: pointer;
`;

const RunTimeBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0px;
  right: 0px;

  color: ${Colours.lightText};
  border: 1px solid ${Colours.primary};
  background-color: ${Colours.background};
  border-top-left-radius: 10px;
`;

const RunTimeHeader = styled.div`
  align-items: center;
  display: flex;

  padding: 5px;
  height: 30px;
  width: 100%;
  justify-content: space-between;
  color: ${Colours.lightText};
  border: 1px solid ${Colours.primary};
  background-color: ${Colours.primary};
  border-top-left-radius: 10px;
`;

export const RunTimeView = () => {
  const store = useStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const [state, setState] = useState<"min" | "float">("min");

  useInterval(
    () => {
      // Your custom logic here
      setTime(time + 0.04);
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? 40 : null
  );

  const onStop = () => {
    setIsPlaying(false);
    setTime(0);
  };

  const minimise = () => {
    setIsPlaying(false);
    setState("min");
  };

  const output = calculateFunction(store.project.mainFn, { time: time });

  const result =
    output && mapOutputToValues(store.project.mainFn.sockets, output);

  if (state == "float") {
    return (
      <Draggable handle={".header"}>
        <RunTimeBox>
          <RunTimeHeader className="header">
            <Contract
              color={Colours.lightText}
              size="small"
              onClick={() => minimise()}
            />
            <RunTimeControls
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onStop={() => onStop()}
            />
          </RunTimeHeader>
          <RunTimeStage scene={result?.scene} />
        </RunTimeBox>
      </Draggable>
    );
  } else {
    return (
      <RunButton onClick={() => setState("float")}>
        <Expand color={Colours.lightText} size="small" />
      </RunButton>
    );
  }
};
