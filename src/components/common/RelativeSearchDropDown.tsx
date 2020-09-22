import React from "react";
import { RelativeDropDown } from "./RelativeDropDown";
import { SearchableDropDown, Option } from "./SearchableDropDown";

interface Props {
  onClose: () => void;
  onCreateNew: (name: string) => void;
  onSelect: (key: string) => void;
  options: Option[];
}

export function RelativeSearchDropDown({
  onClose,
  onCreateNew,
  onSelect,
  options,
}: Props) {
  return (
    <RelativeDropDown onClose={onClose}>
      <SearchableDropDown
        options={options}
        onCreateNew={onCreateNew}
        onSelect={onSelect}
      />
    </RelativeDropDown>
  );
}
