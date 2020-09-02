import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { IParam } from "../../../model/Param";
import { useStore } from "../../../model/Store";
import { observer } from "mobx-react-lite";

const Connector = styled.div`
  border: 1px solid;
  border-color: ${(props: { highlight: boolean }) =>
    props.highlight ? Colours.primary : Colours.lightGrey};
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const ConnectorWrapper = styled.div`
  position: absolute;
  display: block;
  left: -30px;
  margin-top: 5px;
  display: block;
`;

interface Props {
  param: IParam;
}

export const ToConnector = observer(({ param }: Props) => {
  const store = useStore();

  return (
    <ConnectorWrapper
      onMouseOver={() => store.setActiveSocket(param)}
      onMouseOut={() => store.setActiveSocket(undefined)}
    >
      <Connector id={param.id} highlight={param.canConnect} />
    </ConnectorWrapper>
  );
});
