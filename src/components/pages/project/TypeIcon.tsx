import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { IType } from "../../../model/Type";

export const TypeIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 100%;
  color: ${Colours.darkText};
  background-color: ${Colours.background};
  cursor: pointer;
`;

export function TypeIcon({ type }: { type: IType }) {
  return <TypeIconBox>{type.name.charAt(0)}</TypeIconBox>;
}
