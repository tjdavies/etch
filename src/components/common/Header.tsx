import React from "react";
import styled from "styled-components";
import { Colours } from "../../Style";
import { Link } from "react-router-dom";
import { Routes } from "../../Routes";

const HeaderWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  font-size: 40px;
  height: 70px;

  padding-top: 15px;
  padding-bottom: 15px;
  width: fit-content;
  background-color: ${Colours.primary};
  color: ${Colours.lightText};
  border-bottom-right-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  > * {
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    border-left: 2px solid ${Colours.lightText};
  }
  > *:first-child {
    border-left: 0;
  }
`;

const AppName = styled.span`
  display: flex;
  height: 100%;
  align-items: center;
`;

interface props {
  link?: string;
  children?: React.ReactNode;
}

export function PageHeader({ children, link = Routes.projectList }: props) {
  return (
    <HeaderWrapper>
      <Link to={link}>
        <AppName>EtcH</AppName>
      </Link>
      {children}
    </HeaderWrapper>
  );
}
