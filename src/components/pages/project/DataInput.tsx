import React, { useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  padding: 6px;
  margin-right: 2px;
  input {
    text-align: right;
  }
  width: fit-content;
`;

interface Props {
  value?: string;
  onEnter: (value: any) => void;
}

export function DataInput({ value, onEnter }: Props) {
  const [editValue, setValue] = useState(value);
  return (
    <InputWrapper>
      <input
        type="number"
        autoFocus
        value={editValue}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => onEnter(editValue)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter(editValue);
          }
        }}
      />
    </InputWrapper>
  );
}
