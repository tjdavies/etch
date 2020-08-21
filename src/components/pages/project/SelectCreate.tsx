import React, { useState } from "react";

import { DropButton } from "grommet";
import { FormAdd } from "grommet-icons";
import { TypeIconBox } from "./TypeIcon";

const getRegExp = (text: string) => {
  // The line below escapes regular expression special characters:
  // [ \ ^ $ . | ? * + ( )
  const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");

  // Create the regular expression with modified value which
  // handles escaping special characters. Without escaping special
  // characters, errors will appear in the console
  return new RegExp(escapedText, "i");
};

function updateOptions(options: string[], text: string) {
  const exp = getRegExp(text);
  return [...options.filter((o) => exp.test(o))];
}

export function SelectCreate({
  options,
  onSelect,
  onCreateNew,
}: {
  options: string[];
  onCreateNew: (name: string) => void;
  onSelect: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const onSelectHandler = (name: string) => {
    setOpen(false);
    onSelect(name);
  };

  const onCreateNewHandler = (name: string) => {
    setOpen(false);
    onCreateNew(name);
  };

  return (
    <DropButton
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dropContent={
        <FunctionDropDown
          options={options}
          onCreateNew={onCreateNewHandler}
          onSelect={onSelectHandler}
        />
      }
      dropProps={{ align: { top: "top", left: "left" } }}
    >
      <TypeIconBox>
        <FormAdd size="small" />
      </TypeIconBox>
    </DropButton>
  );
}

function FunctionDropDown({
  options,
  onCreateNew,
  onSelect,
}: {
  options: string[];
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
    onCreateNew(searchValue);
  };

  return (
    <div>
      <input
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
      />
      <FunctionList options={dynamicOptions} onSelect={onSelect} />
    </div>
  );
}

function FunctionList({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <ul>
      {options.map((o) => (
        <li key={o} onClick={(e) => onSelect(o)}>
          {o}
        </li>
      ))}
    </ul>
  );
}
