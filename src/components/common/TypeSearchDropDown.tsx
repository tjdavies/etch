import React from "react";
import { RelativeDropDown } from "./RelativeDropDown";
import { SearchableDropDown, Option } from "./SearchableDropDown";

interface Props {
  onClose: () => void;
  onCreateNew: (name: string) => void;
  onSelect: (key: string) => void;
  options: Option[];
  align?: "left" | "right";
}

export function TypeSearchDropDown({
  align,
  onClose,
  onCreateNew,
  onSelect,
  options,
}: Props) {
  return (
    <RelativeDropDown onClose={onClose} align={align}>
      <SearchableDropDown
        options={options}
        onCreateNew={onCreateNew}
        onSelect={onSelect}
      />
    </RelativeDropDown>
  );
}
