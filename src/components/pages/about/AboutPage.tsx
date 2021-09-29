import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { PageHeader } from "../../common/Header";
import { PageContent } from "../../common/PageContent";

const PageWrapper = styled.div`
  position: relative;
`;

export const AboutPage = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>About Etch</title>
        <meta
          name="description"
          content="what makes Etch is an innovative live functional visual programing environment in your browser"
        />
      </Helmet>
      <PageHeader />
      <PageHeader></PageHeader>
      <PageContent>
        <h1>Design Principles</h1>
        <h3>Low floor & wide walls</h3>
        <p>
          EtcH is designed to be instantly more accessible than traditional
          textual languages but also has the potential to become a serious
          programming environment capable of all the same tasks. Currently
          output is limited in functionality but i'm working on it.
        </p>
        <h3>Visual all the way down</h3>
        <p>
          Many visual coding tools allow you to type "real" code into the boxes
          when you need additional functionality. EtcH is designed from first
          principles to be able to compose complex functionality from simple
          base parts as a complete solution.
        </p>
        <h3>Modern functional paradigm</h3>
        <p>
          EtcH takes a pure functional approach to programming separating data
          from computation. An EtcH program is built entirely out of the same
          simple composable building blocks (functions). This reduces the
          concepts needed to be understood and alow certain key features (auto
          function creation).
        </p>
        <h3>A fun playground</h3>
        <p>
          I wanted to remove the early stumbling blocks. A rich UI and features
          such as type safety and realtime debugging are designed to make
          creating software a fun experience. If possible no errors ever.
        </p>
        <h1>Features</h1>
        <h3>Built (at least partially)</h3>
        <ul>
          <li>Functions are project wide and can be nested</li>
          <li>Simple type system</li>
          <li>Project wide shared types</li>
          <li>Nested inspection and wiring</li>
          <li>Everything can be renamed safely</li>
          <li>Type aware static value input</li>
          <li>Live project debugging</li>
          <li>multi drag selections (clone / make function) </li>
          <li>Duplicate / Delete projects</li>
        </ul>
        <h3>On the todo list </h3>
        <ul>
          <li>Map / Reduce and general first class function support</li>
          <li>Save and share project on the "cloud"</li>
          <li>Tutorials and Example projects</li>
          <li>Search / Share functions (modules?)</li>
          <li>Undo / Redo</li>
          <li>multi drag selections (delete ) </li>
          <li>zoom and pan function view</li>
          <li>Expanded type system (lists & unions)</li>
          <li>Scene functionality (images / sounds / layers) </li>
          <li>Effects (network, time, scene events, random numbers) </li>
          <li>Output html?</li>
          <li>mobile / tablet support</li>
          <li>performance optimisations</li>
        </ul>
      </PageContent>
    </PageWrapper>
  );
};
