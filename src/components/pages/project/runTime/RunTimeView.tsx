import React, { useState } from "react";
import styled from "styled-components";
import { Colours } from "../../../../Style";
import {
  useStore,
  mapOutputToValues,
  calculateFunction,
} from "../../../../model/Store";
import { Expand, Contract } from "grommet-icons";
import { RunTimeStage, IScene } from "./RunTimeStage";
import { RunTimeControls } from "./RunTimeControls";
import { useInterval } from "../../../../utils/hooks/useInterval";
import Draggable from "react-draggable";
import { useKeyDown } from "../../../../utils/hooks/useKeyDown";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";

const RunTimeBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0px;
  right: 0px;
  color: ${Colours.lightText};
  border: 1px solid ${Colours.primary};
  background-color: ${Colours.background};
  z-index: 100;
`;

const RunTimeBoxMax = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0px;
  right: 0px;
  left: 0px;
  top: 0px;
  color: ${Colours.lightText};
  border: 1px solid ${Colours.primary};
  background-color: ${Colours.background};
  z-index: 10;
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
`;

const SizeButtons = styled.div`
  display: flex;
`;

const ControlButton = styled.div`
  width: 20px;
  cursor: pointer;
`;

interface Props {
  onDock: () => void;
}

export const RunTimeView = observer(({ onDock }: Props) => {
  const store = useStore();

  const [isPlaying, setIsPlaying] = useState(false);

  // const [time, setTime] = useState(0);

  useInterval(
    () => {
      step();
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? 40 : null
  );

  /*
  if (result?.state) {
    store.setAppState(result?.state);
  }
  */

  const step = () => {
    const output = calculateFunction(store.project.mainFn, store.appState);
    const result =
      output && mapOutputToValues(store.project.mainFn.sockets, output);
    store.setAppState(result?.state);
  };

  const output = calculateFunction(store.project.mainFn, store.appState);
  const result =
    output && mapOutputToValues(store.project.mainFn.sockets, output);

  const props: ViewProps = {
    isPlaying,
    onPlay: () => {
      setIsPlaying(true);
    },
    onStep: () => {
      setIsPlaying(false);
      step();
    },
    onPause: () => {
      setIsPlaying(false);
    },
    onStop: () => {
      store.setAppState({});
      setIsPlaying(false);
    },
    onMaximise: () => {
      store.setRunTimeViewMode("max");
    },
    onMinimise: () => {
      store.setRunTimeViewMode("window");
    },
    onDock,
    scene: result?.scene,
  };

  if (store.runTimeViewMode === "max") {
    return <MaximisedView {...props} />;
  }
  return <FloatingView {...props} />;
});

interface ViewProps {
  isPlaying: boolean;
  onPlay: () => void;
  onStep: () => void;
  onPause: () => void;
  onStop: () => void;
  onMaximise: () => void;
  onMinimise: () => void;
  onDock: () => void;
  scene: IScene;
}

const FloatyScene = styled.div`
  width: 266.666px;
  height: 200px;
`;

function FloatingView({
  isPlaying,
  onPlay,
  onPause,
  onStop,
  onStep,
  onMaximise,
  onDock,
  scene,
}: ViewProps) {
  return (
    <Draggable handle={".header"} bounds="parent">
      <RunTimeBox>
        <RunTimeHeader className="header">
          <SizeButtons>
            <ControlButton>
              <Expand
                color={Colours.lightText}
                size="small"
                onClick={onMaximise}
              />
            </ControlButton>
            <ControlButton>
              <Contract
                color={Colours.lightText}
                size="small"
                onClick={onDock}
              />
            </ControlButton>
          </SizeButtons>
          <RunTimeControls
            isPlaying={isPlaying}
            onPlay={onPlay}
            onPause={onPause}
            onStop={onStop}
            onStep={onStep}
          />
        </RunTimeHeader>
        <FloatyScene>
          <RunTimeStage scene={scene} />
        </FloatyScene>
      </RunTimeBox>
    </Draggable>
  );
}

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colours.lightGrey};
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  max-width: calc(1.33333 * 90vh);
`;

function MaximisedView({
  isPlaying,
  onPlay,
  onPause,
  onStop,
  onStep,
  onMinimise,
  scene,
}: ViewProps) {
  return (
    <RunTimeBoxMax>
      <RunTimeHeader className="header">
        <SizeButtons>
          <ControlButton>
            <Contract
              color={Colours.lightText}
              size="small"
              onClick={onMinimise}
            />
          </ControlButton>
        </SizeButtons>
        <RunTimeControls
          isPlaying={isPlaying}
          onPlay={onPlay}
          onPause={onPause}
          onStop={onStop}
          onStep={onStep}
        />
      </RunTimeHeader>
      <BackGround>
        <Container>
          <RunTimeStage scene={scene} />
        </Container>
      </BackGround>
    </RunTimeBoxMax>
  );
}
