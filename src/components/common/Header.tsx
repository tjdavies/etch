import React, { useEffect } from "react";
import styled from "styled-components";
import { Colours, Padding } from "../../Style";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 40px;
  height: 80px;
  padding-right: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  width: fit-content;
  margin-bottom: ${Padding.default};
  background-color: ${Colours.primary};
  color: ${Colours.lightText};
  border-bottom-right-radius: 20px;
`;

const AppName = styled.span`
  padding-right: 20px;
  padding-left: ${Padding.default};
`;

interface props {
  children?: React.ReactNode;
}

export function PageHeader(props: props) {
  return (
    <HeaderWrapper>
      <Link to={"/"}>
        <AppName>EtcH</AppName>
      </Link>
      {props.children}
    </HeaderWrapper>
  );
}
