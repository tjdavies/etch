import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";

import { PageHeader } from "../../common/Header";
import { PageContent } from "../../common/PageContent";

const PageWrapper = styled.div`
  position: relative;
`;

export const AboutPage = () => {
  return (
    <PageWrapper>
      <PageHeader></PageHeader>
      <PageContent>
        <h1>About</h1>
        <p>
          I am interested in the future of programming and what it may bring and
          how to inspire the next generation. Im also dyslexic myself and I also
          have a dyslexic kid so i'm keen to make programming more accessible.
          Also let us remember that some people never gave up punch cards.
        </p>
        <p></p>
        <p>
          Get in touch
          <br />
          Email: <a href="mailto:tjsdavies@gmail.com">tjsdavies@gmail.com</a>
          <br />
          Twitter:{" "}
          <a href="https://twitter.com/tomsdavies">
            https://twitter.com/tomsdavies
          </a>
        </p>
        <h2>Design Principles</h2>
        <h3>Low floor & wide walls</h3>
        <p>
          EtcH is designed to be instantly more accessible than traditional
          textual languages but also has the potential to become a serious
          programming environment capable of real work. Currently output is
          limited in functionality but i'm working on it.
        </p>
        <h3>Modern functional paradigm</h3>
        <p>
          EtcH takes a modern pure functional approach to programming separating
          data from computation. An EtcH program is built out of the same simple
          building blocks (functions) which dramatically reduces the concepts
          needed to be understood. This is heavily influenced by Elm and React.
        </p>
        <h3>A fun playground</h3>
        <p>
          I want to take the pain out of programming. A rich UI and features
          such as type safety and realtime debugging are designed to make
          creating software a fun experience. If possible no errors ever.
        </p>
        <h3>Visual all the way down</h3>
        <p>
          Many visual coding tools allow you to type "real" code into the boxes
          when you need additional functionality. EtcH is designed from first
          principles to be able to compose complex functionality from simple
          base parts as a complete solution.
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
          <li>multi drag selections (clone / make function) </li>
        </ul>
        <h3>On the todo list </h3>
        <ul>
          <li>Duplicate/ Delete projects</li>
          <li>Map / Reduce and general first class function support</li>
          <li>Better UI / UX</li>
          <li>Save and share project on the "cloud"</li>
          <li>Re-mix projects</li>
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
