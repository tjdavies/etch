import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { HydratedType } from "../../../State";
import { TypeIcon, TypeIconBox } from "./TypeIcon";
import { FormNext, FormDown } from "grommet-icons";
import { NewType } from "./NewType";
import { FromConnector } from "./FromConnector";

const InputLabel = styled.div`
  position: relative;

  color: ${Colours.darkText};
  display: flex;
  align-items: flex-start;
  gap: 5px;
`;

const Indented = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  margin-right: 5px;
  width: 100%;
`;

interface Props {
  refName: string;
  type: HydratedType;
}

export function FromType({ type, refName }: Props) {
  if (type.types) {
    return <RecordType type={type} refName={refName} />;
  }
  return (
    <InputLabel>
      {type.name}
      <TypeIcon type={type} />
      <FromConnector refName={refName} />
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
        {type.name}
        <TypeIconBox onClick={() => toggleExpanded()}>
          {expanded ? <FormDown size="small" /> : <FormNext size="small" />}
        </TypeIconBox>
        <FromConnector refName={thisRefId} />
      </InputLabel>
      {expanded && (
        <Indented>
          {type.types?.map((type) => (
            <FromType
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
