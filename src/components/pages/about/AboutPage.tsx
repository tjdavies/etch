import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";

import { PageHeader } from "../../common/Header";

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
`;

export const AboutPage = () => {
  return (
    <PageWrapper>
      <PageHeader></PageHeader>
      <PageContent>
        <h1>About</h1>
        <p>
          Im interested in the future of programming and what it may bring and
          how to inspire the next generation. Im also dyslexic myself and I also
          have a dyslexic kid so i'm keen to make programming more accessible.
          Also let us remember that some people never gave up punch cards.
        </p>
        <h2>Design Principles</h2>
        <h3>Low floor & wide walls</h3>
        <p>
          EtcH is designed to be instantly more accessible than traditional text
          based languages but has the potential to become a serious programming
          environment capable of real work. Currently output is limited in
          functionality but i'm working on it.
        </p>
        <h3>Modern functional paradigm</h3>
        <p>
          EtcH takes a pure functional approach to programming separating data
          from computation. An EtcH program is built out of the same simple
          building blocks (functions) which reduces the concepts needed to be
          understood. This is heavily influenced by Elm and React.
        </p>
        <h3>A fun playground</h3>
        <p>
          I want to take the pain out of programming. A rich UI and features
          such as type safety and realtime debugging are designed to make
          creating software a fun experience. If possible no errors ever.
        </p>
        <h2>Features</h2>
        <h3>Built (at least partially)</h3>
        <ul>
          <li>Functions are project wide and can be nested</li>
          <li>Simple type system</li>
          <li>Project wide shared types</li>
          <li>Nested inspection and wiring</li>
          <li>Everything can be renamed safely</li>
          <li>Type aware static value input</li>
          <li>Live project debugging</li>
        </ul>
        <h3>On the wish list </h3>
        <ul>
          <li>Duplicate/ Delete projects</li>
          <li>Better UI / UX</li>
          <li>Save and share project on the "cloud"</li>
          <li>Re-Mix projects</li>
          <li>Tutorials and Example projects</li>
          <li>Search / Share functions (modules?)</li>
          <li>Undo / Redo</li>
          <li>multi drag selections (copy / delete / make function) </li>
          <li>zoom and pan function view</li>
          <li>Expanded type system (lists & unions)</li>
          <li>Scene functionality (images / sounds / layers) </li>
          <li>Effects (network, time, scene events) </li>
          <li>Output html?</li>
        </ul>
      </PageContent>
    </PageWrapper>
  );
};
