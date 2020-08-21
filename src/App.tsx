import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ProjectListPage } from "./components/pages/projectList/ProjectListPage";
import { Colours, GrommetTheme } from "./Style";
import { Routes } from "./Routes";
import { ProjectPage } from "./components/pages/project/ProjectPage";
import { Grommet } from "grommet";

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: ${Colours.background};
`;

function App() {
  return (
    <AppWrapper>
      <Grommet theme={GrommetTheme}>
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
      </Grommet>
    </AppWrapper>
  );
}

export default App;
