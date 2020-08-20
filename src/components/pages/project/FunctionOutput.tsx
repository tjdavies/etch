import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { TypeRef } from "../../../State";

const FunctionOutputWrapper = styled.div`
  display: flex;
`;

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

const OutputLabel = styled.div`
  color: ${Colours.darkText};
  display: flex;
  gap: 8px;
`;

const ConnectorWrapper = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const OutputConnector = styled.div`
  height: 20px;
  &:after {
    margin-top: 5px;
    display: block;
    content: "";
    border: 1px solid ${Colours.lightGrey};
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`;

const TypeIcon = styled.div`
  border: 1px solid ${Colours.lightGrey};
  width: 20px;
  height: 20px;
  border-radius: 1px;
`;

interface Props {
  types: TypeRef[];
}

export function FunctionOutput({ types }: Props) {
  return (
    <FunctionOutputWrapper>
      <ConnectorWrapper>
        {types.map((type) => (
          <OutputConnector />
        ))}
      </ConnectorWrapper>
      <OutputBox>
        {types.map((type) => (
          <OutputLabel>
            <TypeIcon></TypeIcon>
            {type.name}
          </OutputLabel>
        ))}
      </OutputBox>
    </FunctionOutputWrapper>
  );
}
