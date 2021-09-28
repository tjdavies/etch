import React from "react";
import { ProjectButtonNew } from "./ProjectButton";
import styled from "styled-components";
import { Colours, Padding } from "../../../Style";
import { Link, generatePath, useHistory } from "react-router-dom";
import { ReactComponent as ForkIcon } from "../../../assets/fork.svg";
import { Routes } from "../../../Routes";
import { PageHeader } from "../../common/Header";
import { createNewProject } from "../../../model/Store";
import { prepend } from "ramda";
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

const StyledForkIcon = styled(ForkIcon)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  fill: white;
  transform: rotate(90deg);
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

export const ExampleProjectPage = () => {
  const history = useHistory();

  const addHelloWorldProject = prepend({ id: "hw", name: "hello world" });

  const addFrogProject = prepend({ id: "nf", name: "ninja frog" });

  const projectList = addFrogProject(addHelloWorldProject([]));

  const onForkProject = (name: string) => {
    const projectList = loadProjectList();
    const project = createNewProject(getValidProjectName(name, projectList));
    saveProject(project);

    history.push(generatePath(Routes.project, { id: project.id }));
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
              onForkProject(project.name);
            }}
          >
            <StyledForkIcon
              onClick={(e) => {
                e.preventDefault();
                onForkProject(project.name);
              }}
            />

            {project.name}
          </ProjectButtonNew>
        ))}
      </ProjectListWrapper>
    </PageWrapper>
  );
};
