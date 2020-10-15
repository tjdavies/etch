import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";

import { PageHeader } from "../../common/Header";
import { PageContent } from "../../common/PageContent";
import validPrograms from "../../../assets/valid-programs.png";
import maxmin from "../../../assets/maxmin.png";
import clamp from "../../../assets/clampFn.png";
import debug from "../../../assets/debug.png";

const PageWrapper = styled.div`
  position: relative;
`;

export const WhyPage = () => {
  return (
    <PageWrapper>
      <PageHeader></PageHeader>
      <PageContent>
        <h1>Sketch n EtcH</h1>
        <p>EtcH is an experimental functional visual programming language.</p>
        <h2>Do we need visual programming?</h2>
        <p>
          Honestly Im not sure but I do know programming will continue to
          evolve. We had punch cards and assembly maybe one day writing stuff in
          text files will seem equally as dated. Battling with errors is a
          barrier to entry that we programmers all managed to get over but how
          many tripped on a syntax error and fell on the way?
        </p>
        <h3>Limitless ways to shoot yourself in the foot.</h3>
        Mark Seemann says this far better than I could in his blog{" "}
        <a href="https://blog.ploeh.dk/2015/04/13/less-is-more-language-features/">
          Less is more: language features
        </a>
        <p>
          The takeaway is being we should try and reduce the number of possible
          errors that can be made but in a way as not to limit the number of
          possible valid programs. However he is only talking about this in the
          context of valid compiled code. What if we add to that another circle
          for all possible text inputs we could give the compiler{" "}
        </p>
        <img src={validPrograms}></img>
        <p>
          So what would a programming environment look like that only allows us
          to create only valid programs? Well there is nothing like a
          challenge...
        </p>
        <h2>Sketch n EtcH</h2>
        <p>
          Visual programming languages have existed for years so what make EtcH
          different? The goal of EtcH is to provide a user friendly environment
          while at the same time keeping the possibilities wide open. Many of
          the design choices are a careful balance between the two.
        </p>
        <h3>Pure Functions</h3>
        <p>
          “You’re building your own maze, in a way, and you might just get lost
          in it.” - Marijn Haverbeke, Eloquent JavaScript: A Modern Introduction
          to Programming
        </p>
        <p>
          Im not from the functional programming world I don't know my monads
          from my endofunctors. However I do understand the concept of a pure
          function. Using only pure functions introduces a constraint that can
          dramatically simplify things.
          <ul>
            <li>It separates data cleanly from logic</li>
            <li>It makes your program deterministic</li>
            <li>Each part of your program is a valid program in its self</li>
            <li>
              No classes, objects, constructors, methods, inheritances,
              instances, callbacks, this, promises, getters n setters, etc...
            </li>
          </ul>
        </p>
        <h3>Turtles all the way down</h3>
        <p>
          In EtcH there is no escape hatch you can't write real code. Instead
          every thing is designed to be composed out of the same basic
          ingredients
        </p>
        <p>
          One of the issues with visual programming is it can lead to literal
          spaghetti code. As Etch is all pure functions we can get the
          environment to help you prevent this.
        </p>
        <p>Draw a box round the functionality</p>
        <img src={maxmin}></img>
        <p>
          Press a button and a new function is create preserving all the exiting
          input and output mappings{" "}
        </p>
        <img src={clamp}></img>
        <p>
          All functions are global and shared throughout a project so can be
          reused and edited.
        </p>
        <h2>Nulls and NaN and undefined</h2>
        <p>
          Variables, constants, lambdas, classes, arguments, errors,
          constructors, methods, inheritance...
          <br />
          If you are a programmer you understand a lot of different concepts.
          You may not remember struggling to learn them but we all did at some
          point. The goal of EtcH is to reduce those to a minimum while keeping
          the possibilities wide open.
          <h3>null and undefined </h3>
          EtcH instead sets default values for types (e.g Number will default to
          0). Any or optional data or errors would need to be explicity handled
          by the type system
          <h3>Variables, Constants</h3>
        </p>
        <h2>Concepts</h2>
        <h3>Functions</h3>
        <p>EtcH functions come in 2 types core and custom</p>
        <p>Core functions are built in to the program and can not be edited </p>
        <h3>Data</h3>
        <h2>Types</h2>
        <p>
          In order for EtcH to be able know what is and isn't allowed by the
          user we need to be able to understand what type of data is in the
          system.{" "}
        </p>
        <p>
          If we only allowed basic types quickly everything would become a mess
          of wires and connectors{" "}
        </p>
        <h2>Debugging</h2>
        <p>
          Just because you can created a "valid" program doesn't mean it
          actually does what you want it to do. There are no lines to step
          though in EtcH instead we can show the live computed values at each
          point. You can pause and step forward frame by frame to see the values
          change.
        </p>
        <img src={debug}></img>
        <p>
          When you open a function in EtcH that same function could be used in
          many places throughout the app so EtcH remembers the context in which
          you navigated to the function
        </p>
        <h2>Output</h2>
        <h2>Community</h2>
      </PageContent>
    </PageWrapper>
  );
};
