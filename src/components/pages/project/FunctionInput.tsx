import React, { memo } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { HydratedType } from "../../../State";
import { InputType } from "./InputType";

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

interface Props {
  refName: string;
  input: HydratedType[];
}

export const FunctionInput = memo(({ input, refName }: Props) => {
  return (
    <FunctionInputWrapper>
      <InputBox>
        {input.map((type) => (
          <InputType key={type.id} type={type} refName={refName} />
        ))}
      </InputBox>
    </FunctionInputWrapper>
  );
});
