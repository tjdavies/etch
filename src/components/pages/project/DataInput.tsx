import { Keyboard } from "grommet-icons";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { TypeColours } from "../../../model/CoreTypes";
import { Colours } from "../../../Style";
import { useKeyPressed } from "../../../utils/hooks/useKeyPressed";
import { useOutsideClick } from "../../../utils/hooks/useOutsideClick";

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
  height: 22px;
  img {
    cursor: pointer;
    height: 22px;
  }
`;

const Input = styled.input`
  text-align: right;
  box-sizing: content-box;
  border: 1px solid ${Colours.primary};
  width: ${(props: { width: string }) => props.width};
`;

const TextInput = styled.input`
  text-align: right;
  box-sizing: content-box;
  border: 1px solid ${TypeColours.string};
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
  if (props.type === "imageSrc") {
    return (
      <InputWrapper>
        <ImageInput {...props} />
      </InputWrapper>
    );
  }
  if (props.type === "keyCode") {
    return (
      <InputWrapper>
        <KeyInput {...props} />
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
    <TextInput
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

  const str = editValue + "";
  return (
    <Input
      ref={inputEl}
      width={str?.length ? str.length + "ch" : "1ch"}
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

function ImageInput({
  value = "/sprites/frog.png",
  onEnter,
  onRemoveValue,
}: Props) {
  const [editValue, setValue] = useState(value);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <>
      {isDropDownOpen && (
        <ImageSelectDropDown
          onClose={() => setIsDropDownOpen(false)}
          onSelect={(imgPath) => {
            setValue(imgPath);
            setIsDropDownOpen(false);
            onEnter(imgPath);
          }}
        />
      )}
      <img src={editValue} onClick={() => setIsDropDownOpen(true)} />
    </>
  );
}

const Dropdown = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 200px;
  border: 1px solid ${Colours.lightGrey};
  border-radius: 4px;
  background-color: ${Colours.white};
  box-shadow: 2px 2px 8px #aaa;
  z-index: 10;
  padding: 10px;
  img {
    cursor: pointer;
  }
`;

const sprites = [
  "spikedBall.png",
  "block.png",
  "blueGuy.png",
  "box1.png",
  "box3.png",
  "frog.png",
  "Idle.png",
  "mask.png",
  "pinkMan.png",
  "rockHead.png",
];

function ImageSelectDropDown({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (imageName: string) => void;
}) {
  const ref = useOutsideClick(onClose);
  return (
    <Dropdown ref={ref}>
      {sprites.map((spriteName) => {
        const imagePath = "/sprites/" + spriteName;
        return <img src={imagePath} onClick={() => onSelect(imagePath)}></img>;
      })}
    </Dropdown>
  );
}

function KeyInput({ value, onEnter, onRemoveValue }: Props) {
  const [isRecordingKey, setRecordKey] = useState(false);

  return isRecordingKey ? (
    <KeyRecorder
      onClose={() => {
        setRecordKey(false);
        onRemoveValue();
      }}
      onKeyDown={(key) => {
        setRecordKey(false);
        onEnter(key);
      }}
    />
  ) : (
    <PressKeyValue onClick={() => setRecordKey(true)}>
      <span>{value}</span>
      <Keyboard />
    </PressKeyValue>
  );
}

const PressKeyValue = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  gap: 5px;
`;

const PressKeyPrompt = styled.span`
  background-color: ${Colours.white};
  white-space: nowrap;
  user-select: none;
  animation: blinker 1s linear infinite;
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

function KeyRecorder({
  onClose,
  onKeyDown,
}: {
  onClose: () => void;
  onKeyDown: (key: string) => void;
}) {
  const ref = useOutsideClick(onClose);
  useKeyPressed(onKeyDown);
  return <PressKeyPrompt ref={ref}>Press a key</PressKeyPrompt>;
}
