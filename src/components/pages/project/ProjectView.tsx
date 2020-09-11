import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { PageHeader } from "../../common/Header";
import { FunctionView } from "./FunctionView";
import { observer } from "mobx-react-lite";
import { IStore } from "../../../model/Store";
import { Revert } from "grommet-icons";
import { useHistory } from "react-router-dom";
import { InlineEdit } from "../../common/InlineEdit";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ProjectNameWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 20px;
  border-left: 2px solid ${Colours.lightText};
`;

const ProjectNameHeader = styled.input`
  width: 100px;
  height: 100%;
  font-size: 20px;
  outline: 0px solid transparent;
  background: none;
  border: none;
  color: ${Colours.lightText};
  padding-right: 20px;
`;

const FnNameHeader = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding-left: 20px;
  border-left: 2px solid ${Colours.lightText};
`;

const RunButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  right: 0px;
  padding: 5px;
  height: 50px;
  width: 50px;
  color: ${Colours.lightText};
  background-color: ${Colours.primary};
  border-top-left-radius: 15px;
  cursor: pointer;
`;

const BackButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  right: 0px;

  height: 50px;
  width: 50px;
  color: ${Colours.lightText};
  background-color: ${Colours.primary};
  cursor: pointer;
  border-bottom-left-radius: 15px;
`;

export const ProjectView = observer(({ store }: { store: IStore }) => {
  let history = useHistory();
  return (
    <PageWrapper>
      <FunctionView fn={store.activeFunction} />
      <PageHeader>
        <ProjectNameWrapper />
        <ProjectNameHeader
          onChange={(e) => {
            store.project.setName(e.target.value);
          }}
          value={store.project.name}
        />
        <FnNameHeader>
          <InlineEdit
            type="text"
            value={store.activeFunction.name}
            onSave={store.activeFunction.setName}
          />
        </FnNameHeader>
      </PageHeader>
      {store.activeFunction.id !== store.project.mainFn.id && (
        <BackButton onClick={history.goBack}>
          <Revert color={Colours.lightText} />
        </BackButton>
      )}

      <RunButton onClick={store.run}> Run </RunButton>
    </PageWrapper>
  );
});
