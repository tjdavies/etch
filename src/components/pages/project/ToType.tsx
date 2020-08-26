import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { TypeIcon, TypeIconBox } from "./TypeIcon";
import { FormNext, FormDown } from "grommet-icons";
import { NewType } from "./NewType";
import { ToConnector } from "./ToConnector";
import { IParam } from "../../../model/Param";
import { IType } from "../../../model/Type";
import { observer } from "mobx-react-lite";

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
  param: IParam;
}

export const ToType = observer(({ param, refName }: Props) => {
  if (param.type.params) {
    return <RecordType type={param.type} refName={refName} />;
  }

  return (
    <InputLabel>
      <ToConnector
        refName={"to." + param.id}
        dragRef={null}
        highlight={param.canConnect}
      />
      <TypeIcon type={param.type} />
      {param.name}
    </InputLabel>
  );
});

function RecordType({ type, refName }: { refName: string; type: IType }) {
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
        <ToConnector refName={thisRefId} dragRef={null} highlight={false} />
        <TypeIconBox onClick={() => toggleExpanded()}>
          {expanded ? <FormDown size="small" /> : <FormNext size="small" />}
        </TypeIconBox>
        {type.name}
      </InputLabel>
      {expanded && (
        <Indented>
          {/*
          type.params?.map((type) => (
            <ToType
              key={type.id}
              type={type}
              refName={thisRefId + "." + type.name}
            />
          ))
          */}
          <NewType />
        </Indented>
      )}
    </>
  );
}
