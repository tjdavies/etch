import React, { useState } from "react";
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
  return [...options.filter((o) => exp.test(o.label))];
}

const SearchableDropDownWrapper = styled.div`
  border: 1px solid ${Colours.lightGrey};
  border-radius: 4px;
  background-color: ${Colours.white};
  box-shadow: 2px 2px 8px #aaa;
  input {
    margin: 3px;
    padding: 1px;
  }
  ul {
    overflow-y: scroll;
    max-height: 200px;
    li {
      padding: 2px;
      padding-left: 6px;
      cursor: pointer;
      &:hover {
        background-color: #df5e8820;
      }
    }
  }
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
  const [dynamicOptions, setOptions] = useState(options);
  const [searchValue, setSearchValue] = useState("");

  const onSearch = (text: string) => {
    setOptions(updateOptions(options, text));
    setSearchValue(text);
  };

  const onEnter = () => {
    if (dynamicOptions.length > 0 && searchValue === dynamicOptions[0].label) {
      onSelect(searchValue);
    } else {
      onCreateNew(searchValue);
    }
  };

  return (
    <SearchableDropDownWrapper>
      <input
        autoFocus
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
      />
      <FunctionList options={dynamicOptions} onSelect={onSelect} />
    </SearchableDropDownWrapper>
  );
}

function FunctionList({
  options,
  onSelect,
}: {
  options: Option[];
  onSelect: (value: string) => void;
}) {
  return (
    <ul>
      {options.map((option) => (
        <li key={option.key} onClick={(e) => onSelect(option.key)}>
          {option.label}
        </li>
      ))}
    </ul>
  );
}
