import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { HydratedType } from "../../../State";
import { TypeIcon, TypeIconBox } from "./TypeIcon";
import { FormNext, FormDown } from "grommet-icons";
import { NewType } from "./NewType";
import { ToConnector } from "./ToConnector";

const InputLabel = styled.div`
  position: relative;
  color: ${Colours.darkText};
  display: flex;
  gap: 5px;
`;

const Indented = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  margin-left: 5px;
  width: 100%;
`;

interface Props {
  refName: string;
  type: HydratedType;
}

export function ToType({ type, refName }: Props) {
  if (type.types) {
    return <RecordType type={type} refName={refName} />;
  }
  return (
    <InputLabel>
      <ToConnector refName={refName} dragRef={null} />
      <TypeIcon type={type} />
      {type.name}
    </InputLabel>
  );
}

function RecordType({ type, refName }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useLayoutEffect(() => {
    (window as any)?.dirty();
  }, [expanded]);

  const thisRefId = [refName, type.id].join(".");

  return (
    <>
      <InputLabel>
        <ToConnector refName={thisRefId} dragRef={null} />
        <TypeIconBox onClick={() => toggleExpanded()}>
          {expanded ? <FormDown size="small" /> : <FormNext size="small" />}
        </TypeIconBox>
        {type.name}
      </InputLabel>
      {expanded && (
        <Indented>
          {type.types?.map((type) => (
            <ToType
              key={type.id}
              type={type}
              refName={thisRefId + "." + type.name}
            />
          ))}
          <NewType />
        </Indented>
      )}
    </>
  );
}
