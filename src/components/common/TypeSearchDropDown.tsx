import React from "react";
import { useStore } from "../../model/Store";
import { RelativeDropDown } from "./RelativeDropDown";
import { SearchableDropDown, Option } from "./SearchableDropDown";

interface Props {
  onClose: () => void;
  onCreateNew: (name: string) => void;
  onSelect: (key: string) => void;
  currentType?: string;
  align?: "left" | "right";
}

export function TypeSearchDropDown({
  align,
  onClose,
  onCreateNew,
  onSelect,
  currentType,
}: Props) {
  const store = useStore();
  return (
    <RelativeDropDown onClose={onClose} align={align}>
      <SearchableDropDown
        options={
          store.project.typeList
            .filter((f) => currentType === undefined || currentType !== f.id)
            .map((f) => ({
              key: f.id,
              label: f.name,
            })) || []
        }
        onCreateNew={onCreateNew}
        onSelect={onSelect}
      />
    </RelativeDropDown>
  );
}
