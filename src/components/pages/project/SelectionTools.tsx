import { Clone, Resources } from "grommet-icons";
import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  height: 30px;
  padding-left: 12px;
  padding-right: 12px;
  gap: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colours.primary};
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const Button = styled.div`
  cursor: pointer;
`;

interface Props {
  onMakeFunction: () => void;
  onDuplicate: () => void;
}

export const SelectionTools = ({ onMakeFunction, onDuplicate }: Props) => {
  return (
    <Wrapper>
      <Button onClick={onDuplicate}>
        <Clone color={Colours.lightText} size="small" />
      </Button>
      <Button onClick={onMakeFunction}>
        <Resources color={Colours.lightText} size="small" />
      </Button>
    </Wrapper>
  );
};
