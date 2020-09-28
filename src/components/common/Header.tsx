import React from "react";
import styled from "styled-components";
import { Colours } from "../../Style";
import { Link } from "react-router-dom";
import { Routes } from "../../Routes";

const HeaderWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  font-size: 40px;
  height: 70px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: fit-content;
  background-color: ${Colours.primary};
  color: ${Colours.lightText};
  border-bottom-right-radius: 20px;
`;

const AppName = styled.span`
  line-height: 60px;
  padding-right: 20px;
  padding-bottom: 5px;
`;

interface props {
  children?: React.ReactNode;
}

export function PageHeader(props: props) {
  return (
    <HeaderWrapper>
      <Link to={Routes.projectList}>
        <AppName>EtcH</AppName>
      </Link>
      {props.children}
    </HeaderWrapper>
  );
}
