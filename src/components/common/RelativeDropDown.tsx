import React from "react";
import styled from "styled-components";

const FloatyDropdown = styled.div`
  position: absolute;
  top: 0px;
  z-index: 10;
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
  children: React.ReactNode;
}

export function RelativeDropDown({ onClose, children }: Props) {
  return (
    <>
      <FloatyDropdownBlocker
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <FloatyDropdown>{children}</FloatyDropdown>
    </>
  );
}
