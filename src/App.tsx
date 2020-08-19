import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ProjectListPage } from "./components/pages/projectList/ProjectListPage";
import { Colours } from "./Style";
import { Routes } from "./Routes";
import { ProjectPage } from "./components/pages/project/ProjectPage";

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: ${Colours.background};
`;

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Switch>
          <Route path={Routes.project}>
            <ProjectPage />
          </Route>
          <Route path="/">
            <ProjectListPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
