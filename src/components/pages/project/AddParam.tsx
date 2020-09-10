import React, { useState } from "react";

import { TypeIconBox } from "./TypeIcon";
import { FormAdd } from "grommet-icons";
import { TypeDropDown } from "./TypeDropDown";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

export function AddParam() {
  const [showSelect, setShowSelect] = useState(false);

  return (
    <Wrapper>
      {showSelect && <TypeDropDown onClose={() => setShowSelect(false)} />}
      <TypeIconBox onClick={() => setShowSelect(true)}>
        <FormAdd size="small" />
      </TypeIconBox>
    </Wrapper>
  );
}
