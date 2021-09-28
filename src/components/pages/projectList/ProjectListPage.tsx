import React, { useState } from "react";
import { ProjectButton, ProjectButtonNew } from "./ProjectButton";
import styled from "styled-components";
import { Padding } from "../../../Style";
import { ReactComponent as PlusIcon } from "../../../assets/plus.svg";
import { Link, generatePath, useHistory } from "react-router-dom";
import { Routes } from "../../../Routes";
import { PageHeader } from "../../common/Header";
import { createNewProject } from "../../../model/Store";

import { loadProjectList, saveProject } from "../../../utils/Save";
import { ProjectHeader } from "./ProjectHeader";

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

export const ProjectListPage = () => {
  const loaded = loadProjectList();
  const history = useHistory();

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
    history.push(generatePath(Routes.project, { id: project.id }));
  };

  return (
    <PageWrapper>
      <PageHeader link={Routes.root}>
        <Link to={"/projects"}>
          <ProjectHeader>projects</ProjectHeader>
        </Link>
        <ProjectHeader>my projects</ProjectHeader>
      </PageHeader>

      <ProjectListWrapper>
        <ProjectButtonNew key={"new"} onClick={onCreateNewHandler}>
          <StyledPlusIcon />
        </ProjectButtonNew>
        {projectList.reverse().map((project) => (
          <Link
            key={project.id}
            to={generatePath(Routes.project, { id: project.id })}
          >
            <ProjectButton>{project.name}</ProjectButton>
          </Link>
        ))}
      </ProjectListWrapper>
    </PageWrapper>
  );
};
