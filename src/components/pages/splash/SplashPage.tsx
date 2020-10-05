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
  padding: 160px;
  padding-top: 100px;
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

const iframe = `<iframe
width="560"
height="315"
src="https://www.youtube.com/embed/W5Z8kVfKivs"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen
></iframe>`;

export const SplashPage = () => {
  return (
    <PageWrapper>
      <PageHeader></PageHeader>
      <PageContent>
        <h1>Welcome to EtcH</h1>
        <p>
          This is a rapidly developing prototype, feel free to play around but
          be aware
        </p>
        <ul>
          <li>Projects may on longer work after an update</li>
          <li>There may well be breaking bugs</li>
          <li>All info is currently saved locally on your browser</li>
        </ul>
        <p>I don't care! </p>
        <Link to={Routes.projectList}>
          <button>Start Creating</button>
        </Link>
        <p>Watch a quick intro to get started</p>
        <ReactPlayer url="https://www.youtube.com/embed/W5Z8kVfKivs" />
        <p>
          Want to find out <Link to={Routes.about}>more?</Link>
        </p>
      </PageContent>
    </PageWrapper>
  );
};
