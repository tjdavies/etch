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

export const ProjectPage = observer(() => {
  const { id } = useParams();

  const store = useStore();

  store.setActiveProject(id);

  if (store.activeProject === null || store.activeFunction === null) {
    return null;
  }

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
    </PageWrapper>
  );

  /*
  // const [project] = useProjectState();

  if (store.project == null || store.activeFunction == null) {
    return null;
  }

  // const fn = useActiveFunction();

  return (
    <PageWrapper>
      <PageHeader>
        <ProjectNameWrapper />
        <ProjectNameHeader
          onChange={(e) => {
            store?.project?.setName(e.target.value);
          }}
          value={store.project.name}
        />
        <FnNameHeader>{store.activeFunction.name}</FnNameHeader>
      </PageHeader>
    </PageWrapper>
  );
  */
});

/*<PageWrapper>
        <FunctionView fn={fn} />
        <PageHeader>
          <ProjectNameWrapper></ProjectNameWrapper>
          <ProjectNameHeader
            onChange={(e) => setProjectName(e.target.value)}
            value={project.name}
          />
          <FnNameHeader>{fn.name}</FnNameHeader>
        </PageHeader>
      </PageWrapper>
      */
