import React, { useState } from "react";

import { TypeIconBox } from "./TypeIcon";
import { FormAdd } from "grommet-icons";
import { RelativeDropDown } from "../../common/RelativeDropDown";
import styled from "styled-components";
import { useStore } from "../../../model/Store";
import { Colours } from "../../../Style";

const Wrapper = styled.div`
  position: relative;
  display: flex;

  align-items: center;
  height: 20px;
`;

interface Props {
  onSelect: (typeId: string) => void;
}

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
  cursor: pointer;
`;

export function AddParam({ onSelect }: Props) {
  const [showSelect, setShowSelect] = useState(false);
  const store = useStore();

  return (
    <Wrapper>
      {showSelect && (
        <RelativeDropDown
          onClose={() => setShowSelect(false)}
          options={
            store.project.typeList.map((f) => ({
              key: f.id,
              label: f.name,
            })) || []
          }
          onCreateNew={(name) => {
            setShowSelect(false);
          }}
          onSelect={(key) => {
            onSelect(key);
            setShowSelect(false);
          }}
        />
      )}
      <AddBox onClick={() => setShowSelect(true)}>
        <FormAdd size="small" />
      </AddBox>
    </Wrapper>
  );
}
