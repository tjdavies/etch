import React, { useState } from "react";

import { TypeIconBox } from "./TypeIcon";
import { FormAdd } from "grommet-icons";
import { RelativeDropDown } from "../../common/RelativeDropDown";
import styled from "styled-components";
import { useStore } from "../../../model/Store";

const Wrapper = styled.div`
  position: relative;
`;

interface Props {
  onSelect: (typeId: string) => void;
}

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
      <TypeIconBox onClick={() => setShowSelect(true)}>
        <FormAdd size="small" />
      </TypeIconBox>
    </Wrapper>
  );
}
