import React from "react";
import { SearchableDropDown } from "./SearchableDropDown";
import styled from "styled-components";
import { Point } from "../../../types/types";
import { useStore } from "../../../model/Store";

interface FloatyDropdownProps {
  position: Point;
}

const FloatyDropdown = styled.div`
  position: absolute;
  left: ${(props: FloatyDropdownProps) => props.position.x + "px"};
  top: ${(props: FloatyDropdownProps) => props.position.y + "px"};
`;

const FloatyDropdownBlocker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  content: " ";
`;

interface Props {
  position: Point;
  onClose: () => void;
}

export function TokenDropDown({ position, onClose }: Props) {
  const store = useStore();

  return (
    <FloatyDropdownBlocker
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <FloatyDropdown
        position={position}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <SearchableDropDown
          options={
            Array.from(store.project.functions.values()).map((f) => ({
              key: f.id,
              label: f.name,
            })) || []
          }
          onCreateNew={(name) => {
            store.createNewFunction(position, name);
            onClose();
          }}
          onSelect={(key) => {
            if (store.activeFunction) {
              const f = store.project.functions.get(key);
              console.log(f);
              if (f) {
                store.activeFunction.addToken(position, f);
              }
            }
            onClose();
          }}
        />
      </FloatyDropdown>
    </FloatyDropdownBlocker>
  );
}
