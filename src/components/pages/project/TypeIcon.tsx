import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { IType } from "../../../model/Type";

export const TypeIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Colours.lightGrey};
  width: 20px;
  height: 20px;
  border-radius: 1px;
  color: ${Colours.darkText};
  background-color: ${Colours.background};
`;

export function TypeIcon({ type }: { type: IType }) {
  return <TypeIconBox>{type.name.charAt(0)}</TypeIconBox>;
}
