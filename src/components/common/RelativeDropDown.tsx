import React from "react";
import styled from "styled-components";
import { useOutsideClick } from "../../utils/hooks/useOutsideClick";

interface AlignProps {
  align: "left" | "right";
}

const FloatyDropdown = styled.div`
  position: absolute;
  top: 0px;
  left: ${(props: AlignProps) => (props.align === "left" ? "0px" : "")};
  right: ${(props: AlignProps) => (props.align === "right" ? "0px" : "")};
  z-index: 10;
`;

interface Props {
  align?: "left" | "right";
  onClose: () => void;
  children: React.ReactNode;
}

export function RelativeDropDown({ onClose, children, align = "left" }: Props) {
  const ref = useOutsideClick(onClose);
  return (
    <>
      <FloatyDropdown ref={ref} align={align}>
        {children}
      </FloatyDropdown>
    </>
  );
}
