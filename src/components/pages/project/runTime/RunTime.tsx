import React from "react";
import styled from "styled-components";
import { Colours } from "../../../../Style";
import { Expand } from "grommet-icons";
import { RunTimeView } from "./RunTimeView";
import { useStore } from "../../../../model/Store";
import { observer } from "mobx-react-lite";

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
  border-top-left-radius: 4px;
  cursor: pointer;
`;

export const RunTime = observer(() => {
  const store = useStore();

  if (store.runTimeViewMode !== "docked") {
    return <RunTimeView onDock={() => store.setRunTimeViewMode("docked")} />;
  } else {
    return (
      <RunButton onClick={() => store.setRunTimeViewMode("window")}>
        <Expand color={Colours.lightText} size="small" />
      </RunButton>
    );
  }
});
