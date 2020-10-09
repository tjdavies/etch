import React, { useState } from "react";
import { ProjectButton, ProjectButtonNew } from "./ProjectButton";
import styled from "styled-components";
import { Colours, Padding } from "../../../Style";
import { ReactComponent as PlusIcon } from "../../../assets/plus.svg";
import { Link, generatePath, useHistory } from "react-router-dom";
import { Routes } from "../../../Routes";
import { PageHeader } from "../../common/Header";
import { createNewProject } from "../../../model/Store";

import { loadProjectList, saveProject } from "../../../utils/Save";
import { prepend, when } from "ramda";

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

function hasItemWithId(id: string) {
  return (loaded: any[]) => {
    return !loaded.some((p) => p.id === id);
  };
}

export const ProjectListPage = () => {
  const loaded = loadProjectList();
  const history = useHistory();

  const addHelloWorldProject = when(
    hasItemWithId("hw"),

    prepend({ id: "hw", name: "hello world" })
  );

  const addFrogProject = when(
    hasItemWithId("nf"),
    prepend({ id: "nf", name: "ninja frog" })
  );

  const list = addFrogProject(addHelloWorldProject(loaded));

  const [projectList, setProjectList] = useState(list);

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
      <PageHeader>
        <ProjectHeader>projects</ProjectHeader>
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
