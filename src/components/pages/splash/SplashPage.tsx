import React from "react";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import { Routes } from "../../../Routes";
import { Colours } from "../../../Style";

import { PageHeader } from "../../common/Header";

const PageWrapper = styled.div`
  position: relative;
`;

const PageContent = styled.div`
  padding: 146px;
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
        <p>
          I want to find out a bit{" "}
          <Link to={Routes.about}>
            <a>more</a>
          </Link>
        </p>
      </PageContent>
    </PageWrapper>
  );
};
