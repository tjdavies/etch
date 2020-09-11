import React from "react";
import { SearchableDropDown, Option } from "./SearchableDropDown";
import styled from "styled-components";
import { useStore } from "../../model/Store";

const FloatyDropdown = styled.div`
  position: absolute;
`;

const FloatyDropdownBlocker = styled.div`
  position: fixed;
  background-color: #0000000a;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  content: " ";
`;

interface Props {
  onClose: () => void;
  onCreateNew: (name: string) => void;
  onSelect: (key: string) => void;
  options: Option[];
}

export function RelativeDropDown({
  onClose,
  onCreateNew,
  onSelect,
  options,
}: Props) {
  return (
    <>
      <FloatyDropdownBlocker
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <FloatyDropdown>
        <SearchableDropDown
          options={options}
          onCreateNew={onCreateNew}
          onSelect={onSelect}
        />
      </FloatyDropdown>
    </>
  );
}
