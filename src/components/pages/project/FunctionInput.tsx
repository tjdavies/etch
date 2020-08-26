import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { FromType } from "./FromType";
import { IParam } from "../../../model/Param";

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
  input: IParam[];
}

export const FunctionInput = ({ input, refName }: Props) => {
  return (
    <InputBox>
      {input.map((param) => (
        <FromType key={param.id} param={param} refName={refName} />
      ))}
    </InputBox>
  );
};
