import React, { useState } from "react";
import { FormDown } from "grommet-icons";
import { TypeSearchDropDown } from "../../common/TypeSearchDropDown";
import styled from "styled-components";

import { IType } from "../../../model/Type";

const Wrapper = styled.div`
  position: relative;
  display: flex;

  align-items: center;
  height: 20px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface Props {
  type: IType;
  onSelect: (typeId: string) => void;
  ///onCreateNew: (name: string) => void;
}

export function ChooseType({ type, onSelect }: Props) {
  const [showSelect, setShowSelect] = useState(false);

  return (
    <Wrapper>
      {showSelect && (
        <TypeSearchDropDown
          onClose={() => setShowSelect(false)}
          currentType={"main"}
          onCreateNew={(name) => {
            // onCreateNew(name);
            setShowSelect(false);
          }}
          onSelect={(key) => {
            onSelect(key);
            setShowSelect(false);
          }}
          align={"left"}
        />
      )}
      <Button>
        : {type.name}{" "}
        <FormDown
          color="white"
          size="small"
          onClick={() => setShowSelect(true)}
        />
      </Button>
    </Wrapper>
  );
}
