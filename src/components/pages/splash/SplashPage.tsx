import React from "react";
import styled from "styled-components";
import { Colours, Padding } from "../../../Style";
import { ReactComponent as PlusIcon } from "../../../assets/plus.svg";
import { PageHeader } from "../../common/Header";

const PageWrapper = styled.div``;

const ProjectHeader = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 20px;
  padding-left: 20px;
  border-left: 2px solid ${Colours.lightText};
`;

export const SplashPage = () => {
  return (
    <PageWrapper>
      <PageHeader>
        <ProjectHeader>projects</ProjectHeader>
      </PageHeader>
    </PageWrapper>
  );
};
