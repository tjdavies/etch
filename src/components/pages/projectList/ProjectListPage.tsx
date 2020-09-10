import React, { useState } from "react";
import { ProjectButton, ProjectButtonNew } from "./ProjectButton";
import styled from "styled-components";
import { Colours, Padding } from "../../../Style";
import { ReactComponent as PlusIcon } from "../../../assets/plus.svg";
import { Link, generatePath } from "react-router-dom";
import { Routes } from "../../../Routes";
import { PageHeader } from "../../common/Header";
import { useStore, createNewProject } from "../../../model/Store";
import { observer } from "mobx-react-lite";
import { loadProjectList, saveProject } from "../../../utils/Save";

const PageWrapper = styled.div``;

const ProjectListWrapper = styled.div`
  padding: ${Padding.default};
  padding-top: 160px;
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

export const ProjectListPage = () => {
  const loaded = loadProjectList();

  const [projectList, setProjectList] = useState(loaded);

  if (projectList === undefined) {
    return null;
  }

  const onCreateNewHandler = () => {
    const project = createNewProject("Project" + (projectList?.length + 1));
    saveProject(project);
    const loaded = loadProjectList();
    if (loaded) {
      setProjectList(loaded);
    }
  };

  return (
    <PageWrapper>
      <PageHeader>
        <ProjectHeader>projects</ProjectHeader>
      </PageHeader>

      <ProjectListWrapper>
        {projectList.map((project) => (
          <Link
            key={project.id}
            to={generatePath(Routes.project, { id: project.id })}
          >
            <ProjectButton>{project.name}</ProjectButton>
          </Link>
        ))}
        <ProjectButtonNew key={"new"} onClick={onCreateNewHandler}>
          <StyledPlusIcon />
        </ProjectButtonNew>
      </ProjectListWrapper>
    </PageWrapper>
  );
};
