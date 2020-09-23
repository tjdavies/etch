import React, { useState } from "react";
import { FormAdd } from "grommet-icons";
import { RelativeSearchDropDown } from "../../common/RelativeSearchDropDown";
import styled from "styled-components";
import { useStore } from "../../../model/Store";
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
  param?: IParam;
  onSelect: (typeId: string) => void;
  onCreateNew: (name: string) => void;
}

export function AddParam({ param, onSelect, onCreateNew }: Props) {
  const [showSelect, setShowSelect] = useState(false);
  const store = useStore();

  return (
    <Wrapper>
      {showSelect && (
        <RelativeSearchDropDown
          onClose={() => setShowSelect(false)}
          options={
            store.project.typeList
              .filter((f) => param === undefined || param.type.id !== f.id)
              .map((f) => ({
                key: f.id,
                label: f.name,
              })) || []
          }
          onCreateNew={(name) => {
            onCreateNew(name);
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
