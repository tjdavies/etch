import React from "react";
import { SearchableDropDown } from "../../common/SearchableDropDown";
import styled from "styled-components";
import { Point } from "../../../types/types";
import { useStore } from "../../../model/Store";

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
  onCreateNew: () => void;
  onSelect: () => void;
}

export function TypeDropDown({ onClose }: Props) {
  const store = useStore();

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
          options={
            Array.from(store.project.types.values()).map((f) => ({
              key: f.id,
              label: f.name,
            })) || []
          }
          onCreateNew={(name) => {
            console.log("onCreateNew");
            //store.createNewFunction(position, name);
            onClose();
          }}
          onSelect={(key) => {
            const t = store.project.types.get(key);
            if (t) {
              store.activeFunction.addInputParam(t);
            }
            onClose();
          }}
        />
      </FloatyDropdown>
    </>
  );
}
