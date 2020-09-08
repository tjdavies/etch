import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";

import { PageHeader } from "../../common/Header";
import { useParams } from "react-router-dom";
import { FunctionView } from "./FunctionView";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../model/Store";

const PageWrapper = styled.div`
  position: relative;
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
  top: 20px;
  right: 20px;
  padding: 5px;
  color: ${Colours.lightText};
  background-color: ${Colours.primary};
  cursor: pointer;
`;

const Error = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProjectPage = observer(() => {
  const { id } = useParams();

  const store = useStore();

  store.setActiveProject(id);

  if (store.activeProject && store.activeFunction) {
    return (
      <PageWrapper>
        <FunctionView fn={store.activeFunction} />
        <PageHeader>
          <ProjectNameWrapper />
          <ProjectNameHeader
            onChange={(e) => {
              store.activeProject?.setName(e.target.value);
            }}
            value={store.activeProject.name}
          />
          <FnNameHeader>{store.activeFunction?.name}</FnNameHeader>
        </PageHeader>
        <RunButton onClick={store.run}> Run </RunButton>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageHeader />
      <Error>Sorry, no project found</Error>
    </PageWrapper>
  );
});
