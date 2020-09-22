import React from "react";
import styled from "styled-components";

interface AlignProps {
  align: "left" | "right";
}

const FloatyDropdown = styled.div`
  position: absolute;
  top: ${(props: AlignProps) => (props.align === "left" ? "0px" : "")};
  right: ${(props: AlignProps) => (props.align === "right" ? "0px" : "")};
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
  align?: "left" | "right";
  onClose: () => void;
  children: React.ReactNode;
}

export function RelativeDropDown({ onClose, children, align = "left" }: Props) {
  return (
    <>
      <FloatyDropdownBlocker
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <FloatyDropdown align={align}>{children}</FloatyDropdown>
    </>
  );
}
