import React, { useEffect } from "react";
import { ProjectButton, ProjectButtonNew } from "./ProjectButton";
import styled from "styled-components";
import { Colours, Padding } from "../../../Style";
import { ReactComponent as PlusIcon } from "../../../assets/plus.svg";
import {
  useProjectListState,
  createNewProject,
  loadProjects,
} from "../../../State";
import { Link, generatePath } from "react-router-dom";
import { Routes } from "../../../Routes";
import { PageHeader } from "../../common/Header";

const PageWrapper = styled.div``;

const ProjectListWrapper = styled.div`
  padding: ${Padding.default};
  display: flex;
  flex-wrap: wrap;
  gap: ${Padding.default};
`;

const StyledPlusIcon = styled(PlusIcon)`
  width: 100px;
`;

const ProjectHeader = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 20px;
  padding-left: 20px;
  border-left: 2px solid ${Colours.lightText};
`;

export function ProjectListPage() {
  useEffect(() => {
    loadProjects();
  }, []);
  const [projectList] = useProjectListState();

  return (
    <PageWrapper>
      <PageHeader>
        <ProjectHeader>projects</ProjectHeader>
      </PageHeader>
      <ProjectListWrapper>
        {projectList?.map((project) => (
          <Link
            key={project.id}
            to={generatePath(Routes.project, { id: project.id })}
          >
            <ProjectButton>{project.name}</ProjectButton>
          </Link>
        ))}
        <ProjectButtonNew key={"new"} onClick={createNewProject}>
          <StyledPlusIcon />
        </ProjectButtonNew>
      </ProjectListWrapper>
    </PageWrapper>
  );
}
