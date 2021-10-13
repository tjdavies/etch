import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Routes } from "../../../Routes";
import { PageHeader } from "../../common/Header";
import ReactPlayer from "react-player";
import { PageContent } from "../../common/PageContent";
import { Helmet } from "react-helmet";

const PageWrapper = styled.div`
  position: relative;
`;

const divStyle = {
  maxWidth: 640,
};

export const SplashPage = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>Etch - functional visual programing in your browser</title>
        <meta
          name="description"
          content="Etch is an innovative live functional visual programing environment in your browser"
        />
      </Helmet>
      <PageHeader />

      <PageContent>
        <h1>Welcome to EtcH</h1>
        <p>
          Etch is an live functional visual programming environment
          right in your browser <br /> <br /> Thats a lot of words but it's a
          whole new way to look at programing so if your a beginner or a
          seasoned coder you may want to watch a quick intro to get you started
        </p>
        <p>
          Or read here what makes Etch <Link to={Routes.why}>different?</Link>
        </p>

        <ReactPlayer
          url="https://www.youtube.com/embed/W5Z8kVfKivs"
          style={divStyle}
          width="100%"
        />
        <p>Alternately you can just jump straight in and get started</p>
        <Link to={Routes.projectList}>
          <button>Start Creating</button>
        </Link>

        <p>
          <br />
          Want to find out a bit more <Link to={Routes.about}>about</Link> Etch
        </p>
        <p>
          <br />
           Etch is also <Link to={{ pathname: "https://github.com/tjdavies/etch" }} target="_blank" >open source</Link>
        </p>
        
      </PageContent>
    </PageWrapper>
  );
};
