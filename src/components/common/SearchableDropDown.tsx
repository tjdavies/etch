import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Colours } from "../../Style";

const getRegExp = (text: string) => {
  // The line below escapes regular expression special characters:
  // [ \ ^ $ . | ? * + ( )
  const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");

  // Create the regular expression with modified value which
  // handles escaping special characters. Without escaping special
  // characters, errors will appear in the console
  return new RegExp(escapedText, "i");
};

export interface Option {
  key: string;
  label: string;
}

function updateOptions(options: Option[], text: string) {
  const exp = getRegExp(text);
  const filteredOptions = options.filter((o) => exp.test(o.label));
  const showCreateNew = text != "" && filteredOptions[0]?.label !== text;
  if (showCreateNew) {
    return [
      { key: "create", label: "Create: '" + text + "'" },
      ...filteredOptions,
    ];
  }
  return filteredOptions;
}
const SearchableDropDownWrapper = styled.div`
  border: 1px solid ${Colours.lightGrey};
  border-radius: 4px;
  background-color: ${Colours.white};
  box-shadow: 2px 2px 8px #aaa;
  color: ${Colours.darkText};
  input {
    margin: 3px;
    padding: 1px;
  }
  ul {
    overflow-y: scroll;
    max-height: 200px;
  }
`;

const ListItem = styled.li`
  padding: 2px;
  padding-left: 6px;
  cursor: pointer;
  background-color: ${(props: { selected: boolean }) =>
    props.selected && "#df5e8820"};
`;

export function SearchableDropDown({
  options,
  onCreateNew,
  onSelect,
}: {
  options: Option[];
  onCreateNew: (name: string) => void;
  onSelect: (name: string) => void;
}) {
  const refs = useRef<any>([]);
  const [dynamicOptions, setOptions] = useState(options);
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSearch = (text: string) => {
    setOptions(updateOptions(options, text));
    setSearchValue(text);
    setSelectedIndex(0);
  };

  const onEnter = () => {
    const item = dynamicOptions[selectedIndex];
    if (item.key === "create") {
      onCreateNew(searchValue);
    } else {
      onSelect(item.key);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter();
    } else if (e.key === "ArrowUp") {
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
        refs.current[selectedIndex - 1].scrollIntoView(false);
      }
    } else if (e.key === "ArrowDown") {
      if (selectedIndex < dynamicOptions.length - 1) {
        setSelectedIndex(selectedIndex + 1);
        refs.current[selectedIndex + 1].scrollIntoView(false);
      }
    }
  };

  return (
    <SearchableDropDownWrapper>
      <input
        autoFocus
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <ul>
        {dynamicOptions.map((option, index) => (
          <ListItem
            ref={(el) => (refs.current[index] = el)}
            selected={selectedIndex === index}
            key={option.key}
            onClick={(e) => onSelect(option.key)}
            onMouseOver={(e) => setSelectedIndex(index)}
          >
            {option.label}
          </ListItem>
        ))}
      </ul>
    </SearchableDropDownWrapper>
  );
}
