import React from "react";
import { ProjectButtonNew } from "./ProjectButton";
import styled from "styled-components";
import { Padding } from "../../../Style";
import { Link } from "react-router-dom";
import { Routes } from "../../../Routes";
import { PageHeader } from "../../common/Header";
import { ProjectHeader } from "./ProjectHeader";

const PageWrapper = styled.div``;

const ProjectListWrapper = styled.div`
  padding: ${Padding.default};
  padding-top: 160px;
  display: flex;
  flex-wrap: wrap;
  gap: ${Padding.default};
`;

export const ProjectFolderPage = () => {
  return (
    <PageWrapper>
      <PageHeader link={Routes.root}>
        <Link to={"/projects"}>
          <ProjectHeader>projects</ProjectHeader>
        </Link>
      </PageHeader>

      <ProjectListWrapper>
        <Link to={"/projects/example"}>
          <ProjectButtonNew>
            Example
            <br />
            Projects
          </ProjectButtonNew>
        </Link>
        <Link to={"/projects/myProjects"}>
          <ProjectButtonNew>
            My <br />
            Projects
          </ProjectButtonNew>
        </Link>
      </ProjectListWrapper>
    </PageWrapper>
  );
};
