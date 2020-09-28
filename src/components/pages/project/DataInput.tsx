import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";

const InputWrapper = styled.div`
  margin-right: 4px;
  input {
    text-align: right;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  width: fit-content;
`;

const Input = styled.input`
  text-align: right;
  box-sizing: content-box;
  border: 1px solid ${Colours.primary};
  width: ${(props: { width: string }) => props.width};
`;

interface Props {
  type: string;
  value: any;
  onEnter: (value: any) => void;
  onRemoveValue: () => void;
}

export function DataInput(props: Props) {
  if (props.type === "number") {
    return (
      <InputWrapper>
        <NumberInput {...props} />
      </InputWrapper>
    );
  }
  if (props.type === "boolean") {
    return (
      <InputWrapper>
        <BooleanInput {...props} />
      </InputWrapper>
    );
  }
  if (props.type === "colour") {
    return (
      <InputWrapper>
        <ColourInput {...props} />
      </InputWrapper>
    );
  }
  if (props.type === "string") {
    return (
      <InputWrapper>
        <StringInput {...props} />
      </InputWrapper>
    );
  }
  return null;
}

function StringInput({ value, onEnter, onRemoveValue }: Props) {
  const inputEl = useRef<any>(null);
  const [editValue, setValue] = useState<string>(value);
  const onSetValue = () => {
    if (editValue !== "") {
      onEnter(editValue);
    } else {
      onRemoveValue();
    }
  };

  return (
    <Input
      ref={inputEl}
      width={editValue?.length ? editValue.length + "ch" : "1ch"}
      autoFocus
      value={editValue}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={() => onSetValue()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          inputEl?.current?.blur();
          //onSetValue();
        }
      }}
    />
  );
}

function NumberInput({ value, onEnter, onRemoveValue }: Props) {
  const inputEl = useRef<any>(null);
  const [editValue, setValue] = useState<string>(value);
  const onSetValue = () => {
    if (editValue !== "" && !isNaN(Number(editValue))) {
      onEnter(Number(editValue));
    } else {
      onRemoveValue();
    }
  };

  return (
    <Input
      ref={inputEl}
      width={editValue?.length ? editValue.length + "ch" : "1ch"}
      type="number"
      autoFocus
      value={editValue}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={() => onSetValue()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          inputEl?.current?.blur();
          //onSetValue();
        }
      }}
    />
  );
}

function BooleanInput({ value = false, onEnter, onRemoveValue }: Props) {
  const [editValue, setValue] = useState(value);

  const onSetValue = () => {
    onEnter(editValue);
  };

  return (
    <input
      type="checkbox"
      autoFocus
      checked={editValue}
      onChange={(e) => {
        setValue(e.target.checked);
      }}
      onBlur={() => onSetValue()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSetValue();
        }
      }}
    />
  );
}

function ColourInput({ value = "#F00", onEnter, onRemoveValue }: Props) {
  const [editValue, setValue] = useState(value);
  const onSetValue = () => {
    if (editValue) {
      onEnter(editValue);
    } else {
      onRemoveValue();
    }
  };

  return (
    <input
      type="color"
      value={editValue}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={() => onSetValue()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSetValue();
        }
      }}
    />
  );
}
