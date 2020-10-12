import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Routes } from "../../../Routes";
import { Colours } from "../../../Style";

import { PageHeader } from "../../common/Header";
import ReactPlayer from "react-player";

const PageWrapper = styled.div`
  position: relative;
`;

const PageContent = styled.div`
  padding: 12%;
  padding-top: 60px;
  height: 100%;
  font-size: 20px;
  color: ${Colours.darkText};
  h1 {
    color: ${Colours.primary};
  }
  h2 {
    color: ${Colours.primary};
  }
  h3 {
    color: ${Colours.secondary};
  }
  ul {
    padding: 10px;
    margin: 10px;
    list-style-type: disc;
  }
  button {
    color: ${Colours.lightText};
    background-color: ${Colours.primary};
    border: none;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
  }
  a {
    text-decoration: underline;
    color: ${Colours.primary};
  }
`;

const About = styled.div`
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
      <PageHeader />

      <PageContent>
        <h1>Welcome to EtcH</h1>
        <p>
          Etch is a functional visual programming environment in your browser
        </p>
        <p>
          This is a rapidly developing prototype, feel free to play around but
          be aware
        </p>
        <ul>
          <li>Projects may on longer work after an update</li>
          <li>There may well be bugs</li>
          <li>All info is currently saved locally on your browser</li>
        </ul>
        <Link to={Routes.projectList}>
          <button>Start Creating</button>
        </Link>
        <p>or watch a quick intro to get started</p>
        <ReactPlayer url="https://www.youtube.com/embed/W5Z8kVfKivs" />
        <p>
          Want to find out <Link to={Routes.about}>more?</Link>
        </p>
      </PageContent>
    </PageWrapper>
  );
};
