import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { HydratedType } from "../../../State";
import { FormDown } from "grommet-icons";

export const TypeIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Colours.lightGrey};
  width: 20px;
  height: 20px;
  border-radius: 1px;
  color: ${Colours.darkText};
`;

interface Props {
  type: HydratedType;
}

export function TypeIcon({ type }: Props) {
  return <TypeIconBox>S</TypeIconBox>;
}
