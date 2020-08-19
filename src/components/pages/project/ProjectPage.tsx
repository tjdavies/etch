import React, { useEffect } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { loadProject, useProjectState, setProjectName } from "../../../State";

import { PageHeader } from "../../common/Header";
import { useParams } from "react-router-dom";

const PageWrapper = styled.div``;

const ProjectNameHeader = styled.input`
  font-size: 20px;
  outline: 0px solid transparent;
  background: none;
  border: none;
  color: ${Colours.lightText};
`;

const ProjectNameWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  padding-left: 20px;
  border-left: 2px solid ${Colours.lightText};
`;

export function ProjectPage() {
  let { id } = useParams();
  useEffect(() => {
    loadProject(id);
  }, []);

  const [project] = useProjectState();

  if (project == null) {
    return null;
  }

  return (
    <PageWrapper>
      <PageHeader>
        <ProjectNameWrapper></ProjectNameWrapper>
        <ProjectNameHeader
          onChange={(e) => setProjectName(e.target.value)}
          value={project.name}
        />
      </PageHeader>
    </PageWrapper>
  );
}
