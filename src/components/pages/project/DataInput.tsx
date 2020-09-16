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
  onEnter: (value: any) => void;
}

export function DataInput({ onEnter }: Props) {
  const [value, setValue] = useState("");
  return (
    <InputWrapper>
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => onEnter(value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter(value);
          }
        }}
      />
    </InputWrapper>
  );
}
