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
  isInput: boolean;
}

export function AddParam({ isInput }: Props) {
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
            console.log("onCreateNew");
            setShowSelect(false);
          }}
          onSelect={(key) => {
            const t = store.project.types.get(key);
            if (t) {
              if (isInput) {
                store.activeFunction.addInputParam(t);
              } else {
                store.activeFunction.addOutputParam(t);
              }
            }
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
