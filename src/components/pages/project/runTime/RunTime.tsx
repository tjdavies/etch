import React, { useState } from "react";
import styled from "styled-components";
import { Colours } from "../../../../Style";
import { Expand } from "grommet-icons";
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
