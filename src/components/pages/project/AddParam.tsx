import React, { useState } from "react";
import { FormAdd } from "grommet-icons";
import { TypeSearchDropDown } from "../../common/TypeSearchDropDown";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { IParam } from "../../../model/Param";

const Wrapper = styled.div`
  position: relative;
  display: flex;

  align-items: center;
  height: 20px;
`;

export const AddBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Colours.lightGrey};
  width: 15px;
  height: 15px;
  border-radius: 1px;
  color: ${Colours.darkText};
  background-color: ${Colours.background};
  margin-right: 12px;
  margin-left: 12px;
  cursor: pointer;
`;

interface Props {
  align?: "left" | "right";
  param?: IParam;
  onSelect: (typeId: string) => void;
  onCreateNew: (name: string) => void;
}

export function AddParam({ param, onSelect, onCreateNew, align }: Props) {
  const [showSelect, setShowSelect] = useState(false);

  return (
    <Wrapper>
      {showSelect && (
        <TypeSearchDropDown
          onClose={() => setShowSelect(false)}
          currentType={param?.type.id}
          onCreateNew={(name) => {
            onCreateNew(name);
            setShowSelect(false);
          }}
          onSelect={(key) => {
            onSelect(key);
            setShowSelect(false);
          }}
          align={align}
        />
      )}
      <AddBox onClick={() => setShowSelect(true)}>
        <FormAdd size="small" />
      </AddBox>
    </Wrapper>
  );
}
