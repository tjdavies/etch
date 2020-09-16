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
import { RunTimeView } from "./RunTimeView";

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

const SizeButtons = styled.div`
  display: flex;
`;

const ControlButton = styled.div`
  width: 20px;
  cursor: pointer;
`;

export const RunTime = () => {
  const [docked, setIsDocked] = useState(true);

  if (!docked) {
    return <RunTimeView onDock={() => setIsDocked(true)} />;
  } else {
    return (
      <RunButton onClick={() => setIsDocked(false)}>
        <Expand color={Colours.lightText} size="small" />
      </RunButton>
    );
  }
};
