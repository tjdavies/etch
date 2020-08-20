import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { TypeRef } from "../../../State";

const FunctionInputWrapper = styled.div`
  display: flex;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  border: 1px solid ${Colours.lightGrey};
  width: 120px;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  padding: 10px;
`;

const InputLabel = styled.div`
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

const InputConnector = styled.div`
  width: 20px;
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
  input: TypeRef[];
}

export function FunctionInput({ input }: Props) {
  return (
    <FunctionInputWrapper>
      <InputBox>
        {input.map((type) => (
          <InputLabel>
            {type.name}
            <TypeIcon></TypeIcon>
          </InputLabel>
        ))}
      </InputBox>
      <ConnectorWrapper>
        {input.map((type) => (
          <InputConnector />
        ))}
      </ConnectorWrapper>
    </FunctionInputWrapper>
  );
}
