import React from "react";
import styled from "styled-components";
import { Colours } from "../../Style";

export const PageContent = styled.div`
  padding: 12%;
  padding-top: 60px;
  height: 100%;
  font-size: 20px;
  color: ${Colours.darkText};
  overflow: auto;
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
    color: ${Colours.secondary};
    text-decoration: underline;
  }
`;
