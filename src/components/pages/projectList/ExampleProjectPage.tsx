import React from "react";
import { ProjectButtonNew, StyledForkIcon } from "./ProjectButton";
import styled from "styled-components";
import { Padding } from "../../../Style";
import { Link, useHistory } from "react-router-dom";

import { Routes } from "../../../Routes";
import { PageHeader } from "../../common/Header";
import { prepend } from "ramda";
import { cloneProject } from "../../../utils/Save";
import { ProjectHeader } from "./ProjectHeader";

const PageWrapper = styled.div``;

const ProjectListWrapper = styled.div`
  padding: ${Padding.default};
  padding-top: 160px;
  display: flex;
  flex-wrap: wrap;
  gap: ${Padding.default};
`;

export const ExampleProjectPage = () => {
  const history = useHistory();

  const addHelloWorldProject = prepend({ id: "hw", name: "hello world" });

  const addFrogProject = prepend({ id: "nf", name: "ninja frog" });

  const projectList = addFrogProject(addHelloWorldProject([]));

  const onForkProject = (id: string) => {
    cloneProject(id);
    history.push(Routes.myProjects);
  };

  return (
    <PageWrapper>
      <PageHeader link={Routes.root}>
        <Link to={"/projects"}>
          <ProjectHeader>projects</ProjectHeader>
        </Link>
        <ProjectHeader>examples</ProjectHeader>
      </PageHeader>

      <ProjectListWrapper>
        {projectList.reverse().map((project) => (
          <ProjectButtonNew
            onClick={(e) => {
              e.preventDefault();
              onForkProject(project.id);
            }}
          >
            <StyledForkIcon />

            {project.name}
          </ProjectButtonNew>
        ))}
      </ProjectListWrapper>
    </PageWrapper>
  );
};
