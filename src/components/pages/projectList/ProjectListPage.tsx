import React, { useState } from "react";
import {
  ProjectButton,
  ProjectButtonNew,
  StyledForkIcon,
  StyledDeleteIcon,
} from "./ProjectButton";
import styled from "styled-components";
import { Padding } from "../../../Style";
import { ReactComponent as PlusIcon } from "../../../assets/plus.svg";
import { Link, generatePath, useHistory } from "react-router-dom";
import { Routes } from "../../../Routes";
import { PageHeader } from "../../common/Header";
import { createNewProject } from "../../../model/Store";

import {
  deleteProject,
  loadProjectList,
  saveProject,
  cloneProject,
} from "../../../utils/Save";
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

function getValidProjectName(
  name: string,
  projectList: {
    name: string;
  }[]
): string {
  if (projectList.some((p) => p.name === name)) {
    const bits = name.split(" ");
    const lastBit = bits.pop();
    if (lastBit && parseInt(lastBit)) {
      return getValidProjectName(
        bits.join(" ") + " " + (parseInt(lastBit) + 1),
        projectList
      );
    }
    return getValidProjectName(name + " 1", projectList);
  }
  return name;
}

export const ProjectListPage = () => {
  const loaded = loadProjectList();
  const history = useHistory();

  const [projectList, setProjectList] = useState(loaded);

  if (projectList === undefined) {
    return null;
  }

  const onCreateNewHandler = () => {
    const project = createNewProject(
      getValidProjectName("Project", projectList)
    );
    const loaded = saveProject(project);
    if (loaded) {
      setProjectList(loaded);
    }
    history.push(generatePath(Routes.project, { id: project.id }));
  };

  const onForkProject = (id: string) => {
    const loaded = cloneProject(id);
    if (loaded) {
      setProjectList(loaded);
    }
  };

  const onDeleteProject = (projectId: string) => {
    const loaded = deleteProject(projectId);
    if (loaded) {
      setProjectList(loaded);
    }
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
            <ProjectButton>
              <StyledForkIcon
                onClick={(e) => {
                  e.preventDefault();
                  onForkProject(project.id);
                }}
              />
              <StyledDeleteIcon
                onClick={(e) => {
                  e.preventDefault();
                  onDeleteProject(project.id);
                }}
              />
              {project.name}
            </ProjectButton>
          </Link>
        ))}
      </ProjectListWrapper>
    </PageWrapper>
  );
};
