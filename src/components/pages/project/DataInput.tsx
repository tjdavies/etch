import React, { useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  position: absolute;
  display: block;
  right: 100%;
  top: -6px;
  padding: 6px;
  margin-right: 22px;
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
