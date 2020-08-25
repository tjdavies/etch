import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { HydratedType } from "../../../State";
import { ToType } from "./ToType";

const OutputBox = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${Colours.lightGrey};
  width: 120px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  padding: 10px;
`;

interface Props {
  refName: string;
  types: HydratedType[];
}

export function FunctionOutput({ types, refName }: Props) {
  return (
    <OutputBox>
      {types.map((type) => (
        <ToType key={type.id} type={type} refName={refName} />
      ))}
    </OutputBox>
  );
}
