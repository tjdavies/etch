import React from "react";
import styled from "styled-components";

import { IType } from "../../../model/Type";
import { Colours } from "../../../Style";

interface Props {
  type: IType;
  value: any;
}

const InspectBox = styled.div`
  position: absolute;
  bottom: 12px;
  left: 16px;
  border: 1px solid ${Colours.lightGrey};
  background-color: ${Colours.background};
  pointer-events: none;
  font-size: 14px;
  padding: 2px;
  line-height: 14px;
  color: ${Colours.lightGrey};
`;

export function DataOutput(props: Props) {
  if (props.type.id === "string") {
    return (
      <InspectBox>
        <NumberInput {...props} />
      </InspectBox>
    );
  }
  if (props.type.id === "number") {
    return (
      <InspectBox>
        <NumberInput {...props} />
      </InspectBox>
    );
  }
  if (props.type.id === "boolean") {
    return (
      <InspectBox>
        <BooleanInput {...props} />
      </InspectBox>
    );
  }
  if (props.type.id === "colour") {
    return (
      <InspectBox>
        <ColourInput {...props} />
      </InspectBox>
    );
  }
  return null;
}

function NumberInput({ value }: Props) {
  return <span>{value}</span>;
}

function BooleanInput({ value = false }: Props) {
  return <span>{value ? "T" : "F"}</span>;
}

const ColourValue = styled.div`
  background-color: ${(props: { colour: string }) => props.colour};
  width: 10px;
  height: 10px;
`;

function ColourInput({ value = "#F00" }: Props) {
  return <ColourValue colour={value} />;
}
