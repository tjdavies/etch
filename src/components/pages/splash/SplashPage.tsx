import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Routes } from "../../../Routes";
import { Colours } from "../../../Style";

import { PageHeader } from "../../common/Header";
import ReactPlayer from "react-player";
import { PageContent } from "../../common/PageContent";

const PageWrapper = styled.div`
  position: relative;
`;

const About = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 20px;
  padding-left: 20px;
  border-left: 2px solid ${Colours.lightText};
`;

const divStyle = {
  maxWidth: 640,
};

export const SplashPage = () => {
  return (
    <PageWrapper>
      <PageHeader />

      <PageContent>
        <h1>Welcome to EtcH</h1>
        <p>
          Etch is a functional visual programming environment right in your
          browser
        </p>

        <Link to={Routes.projectList}>
          <button>Start Creating</button>
        </Link>
        <p>or watch a quick intro to get started</p>
        <ReactPlayer
          url="https://www.youtube.com/embed/W5Z8kVfKivs"
          style={divStyle}
          width="100%"
        />
        <p>
          Want to find out a bit more <Link to={Routes.about}>about</Link> Etch
        </p>
        <p>
          Or read here what makes Etch <Link to={Routes.why}>different?</Link>
        </p>
      </PageContent>
    </PageWrapper>
  );
};
