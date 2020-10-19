import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";

import { PageHeader } from "../../common/Header";
import { PageContent } from "../../common/PageContent";
import validPrograms from "../../../assets/valid-programs.png";
import maxmin from "../../../assets/maxmin.png";
import clamp from "../../../assets/clampFn.png";
import debug from "../../../assets/debug.png";
import record from "../../../assets/records.png";
import data from "../../../assets/data.png";

const PageWrapper = styled.div`
  position: relative;
`;

export const WhyPage = () => {
  return (
    <PageWrapper>
      <PageHeader></PageHeader>
      <PageContent>
        <h1>An EtcH to Scratch</h1>
        <p>
          EtcH is an experimental functional visual programming language. I hope
          to cover the reasons why I think its worthy experiment and how it does
          things a little differently.
        </p>
        <h2>Do we need visual programming?</h2>
        <p>
          Honestly Im not sure but let me put forward a few reasons that we
          should consider it
        </p>
        <p>
          I learned to code more of less by just playing with flash and before
          that director. These tools provided a friendlily environment with
          instance feed back and i'm honestly not sure I would have got into
          coding other wise. Battling with errors is a barrier to entry that we
          programmers all managed to get over but how many tripped on a syntax
          error and fell on the way?
        </p>
        <p>
          We had punch cards and assembly possibly one day writing stuff in text
          files will seem equally as dated.
        </p>
        <h3>Limitless ways to shoot yourself in the foot.</h3>
        <p>
          Mark Seemann covers this far better than I could in his blog{" "}
          <a
            href="https://blog.ploeh.dk/2015/04/13/less-is-more-language-features/"
            target="blank"
          >
            Less is more: language features
          </a>{" "}
          which I recommend giving a good read.
        </p>
        <p>
          The takeaway is being we should try and reduce the number of possible
          errors that can be made but in a way as not to limit the number of
          possible valid programs. However he is only talking about this in the
          context of valid compiled code. What if we add to that another circle
          for all possible text inputs we could give the compiler{" "}
        </p>
        <img src={validPrograms}></img>
        <p>
          So lets consider for a minute what would a programming environment
          look like that only allows us to create only valid programs? Well
          there is nothing like a challenge...
        </p>
        <h2>Sketch n EtcH</h2>
        <p>
          Visual programming languages have existed for years so what make EtcH
          different?{" "}
        </p>{" "}
        <p>
          EtcH is designed to be a "proper" visual first language. There is no
          escape hatch where you can write "real" code as in some environments.
          Nor is it like scratch where your creating javascript underneath (well
          you are but not quite so literally). The design choices are a careful
          balance between a nice UX and keeping the keeping the possibilities
          wide open.
        </p>
        <h3>Pure Functions</h3>
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
              Reduces the number of concepts needed to be understood. No
              classes, objects, constructors, methods, inheritances, instances,
              callbacks, this, promises, getters n setters, etc...
            </li>
          </ul>
        </p>
        <h3>Turtles all the way down</h3>
        <p>
          As in EtcH there is no escape hatch you can't write real code. Instead
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
        <h2>Types</h2>
        <p>
          In order for EtcH to be able know what is and isn't allowed by the
          user we need to be able to understand what type of data is in the
          system. Etch will only allow you to make valid connections.
        </p>
        <p>
          If we only had basic types quickly everything would become a spaghetti
          like mess of wires and connectors as we have to add more and more
          augments to keep track of the data. To try and mitigate this EtcH
          allows us to create records (objects with out methods). This means we
          can pass around say a User or we can open it up and pull out just the
          postcode for validation.
        </p>
        <img src={record}></img>
        <p>
          This area definitely need some work around the UX and some proper
          thought in to how best to support more complex types like unions and
          lists but shows some promise as to how to deal with the complexity of
          real applications. It also allows an intuitive form of destuctring so
          that you can easily modify just some parts of a record.
        </p>
        <h2>Data</h2>
        <p>
          Another interesting area is how we deal with program data in EtcH.
          There are no variables or constants as such instead we can add data
          directly to a "socket" (any place you can wire a connection too). As
          we know the expected type EtcH gives us intuitive ways to input data
          e.g colours can use a colour picker. Also worth noting is that there
          is no Null or Undefined instead types default to default values (0 for
          a number) to reduce complexity. Any optional data would need to be
          specifically typed as such.
        </p>
        <img src={data}></img>
        <p>
          If we want to share the same data in multiple places we can make a
          function that returns a fixed set of data and share that. Again this
          is reducing the number of concepts need to be understood.
        </p>
        <h2>Output</h2>
        <p>
          Given that EtcH is designed to be accessible introduction to "real"
          programming and its visual nature it seemed right that making games
          would be a good fit. There is no reason however that it could not be
          used to any kind of programming in theory. I have limited resources so
          have tired to pick what I thought would have the best impact.
        </p>
        <p>
          I felt it was important to be able to have options to be able to see
          the results of your program in real time as you make changes. So I
          added a floating output window option as well as full screen. This is
          particularly import when it comes to...
        </p>
        <h2>Debugging</h2>
        <p>
          Just because you can created a "valid" program doesn't mean it
          actually does what you want it to do. There are no lines of code to
          step though in so EtcH instead we can show the live computed values at
          each point. You can pause and step forward "frame by frame" to see the
          values change. What often seems to be an afterthought (*cough*
          javascript) is recognised here a crucial to the developer experience.
        </p>
        <img src={debug}></img>
        <p>
          When you open a function in EtcH that same function could be used in
          many places throughout the app so EtcH remembers the context in which
          you navigated to the function
        </p>
        <h2>Community</h2>
        <p>
          Another area I have had little time to explore as yet is community. As
          EtcH is browser based it will be possible to share projects, libraries
          and even functions in a seamless way. Given more time I think this
          could lead to some interesting ways of sharing and working.
        </p>
        <h2>That's a wrap</h2>
        <p>
          Im very happy with the way this has turned out so far and it shows a
          lot of promise although there are still tricky problems to solve. A
          big nod to{" "}
          <a href="https://elm-lang.org/" target="blank">
            Elm
          </a>{" "}
          which has heavily influenced the design of EtcH and{" "}
          <a href="https://mobx-state-tree.js.org/" target="blank">
            MobX-state-tree
          </a>{" "}
          for doing its magic.
        </p>
        And if you haven't already <a href="/">try it out</a>
        <p>Get in touch:</p>
        <a href="https://twitter.com/tomsdavies" target="blank">
          https://twitter.com/tomsdavies
        </a>{" "}
      </PageContent>
    </PageWrapper>
  );
};
