import React from "react";

import { useProjectState } from "../../../State";
import { SelectCreate } from "./SelectCreate";

export function NewType() {
  const [project] = useProjectState();
  if (project) {
    const fList = Object.values(project.types).map((f) => f.name);
    return (
      <SelectCreate
        options={fList}
        onCreateNew={console.log}
        onSelect={console.log}
      />
    );
  }
  return null;
}
