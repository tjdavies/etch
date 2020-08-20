import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";

const TypeIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Colours.lightGrey};
  width: 20px;
  height: 20px;
  border-radius: 1px;
  color: ${Colours.darkText};
  cursor: pointer;
`;

export function NewType() {
  return <TypeIconBox>+</TypeIconBox>;
}
