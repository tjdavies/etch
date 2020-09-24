import React from "react";
import { SearchableDropDown } from "../../common/SearchableDropDown";
import styled from "styled-components";
import { Point } from "../../../types/types";
import { useStore } from "../../../model/Store";

interface FloatyDropdownProps {
  position: Point;
}

const FloatyDropdown = styled.div`
  position: absolute;
  width: fit-content;
  left: min(
    calc(100vw - 180px),
    ${(props: FloatyDropdownProps) => props.position.x + "px"}
  );
  top: min(
    calc(100vh - 250px),
    ${(props: FloatyDropdownProps) => props.position.y + "px"}
  );
`;

const FloatyDropdownBlocker = styled.div`
  position: fixed;
  background-color: #0000000a;
  z-index: 10;
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
          options={store.project.functionList
            .filter((f) => f !== store.project.mainFn)
            .map((f) => ({
              key: f.id,
              label: f.name,
            }))}
          onCreateNew={(name) => {
            onClose();
            store.createNewFunction(position, name);
          }}
          onSelect={(key) => {
            if (store.activeFunction) {
              const f = store.project.functions.get(key);
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
