import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { TypeIcon, TypeIconBox } from "./TypeIcon";
import { FormNext, FormDown } from "grommet-icons";
import { NewType } from "./NewType";
import { FromConnector } from "./FromConnector";
import { IParam } from "../../../model/Param";
import { IType } from "../../../model/Type";

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
  param: IParam;
}

export function FromType({ param, refName }: Props) {
  if (param.type.params) {
    return <RecordType type={param.type} refName={"from." + param.id} />;
  }
  return (
    <InputLabel>
      {param.name}
      <TypeIcon type={param.type} />
      <FromConnector param={param} refName={"from." + param.id} />
    </InputLabel>
  );
}

function RecordType({ type, refName }: { refName: string; type: IType }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  /*
  useLayoutEffect(() => {
    (window as any)?.dirty();
  }, [expanded]);
  */

  //  const thisRefId = [refName, type.id].join(".");

  return (
    <>
      <InputLabel>
        {type.name}
        <TypeIconBox onClick={() => toggleExpanded()}>
          {expanded ? <FormDown size="small" /> : <FormNext size="small" />}
        </TypeIconBox>
      </InputLabel>
      {expanded && (
        <Indented>
          {/*
          type.types?.map((type) => (
            <FromType
              key={type.id}
              type={type}
              refName={thisRefId + "." + type.name}
            />
          ))*/}
          <NewType />
        </Indented>
      )}
    </>
  );
}

/*    
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
          {
          type.types?.map((type) => (
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
    */
