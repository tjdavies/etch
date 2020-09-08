import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ProjectListPage } from "./components/pages/projectList/ProjectListPage";
import { Colours, GrommetTheme } from "./Style";
import { Routes } from "./Routes";
import { ProjectPage } from "./components/pages/project/ProjectPage";
import { Grommet } from "grommet";
import { Store, StoreProvider } from "./model/Store";
import { loadProjectList, saveProjectList } from "./utils/Save";
import { onSnapshot } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: ${Colours.background};
`;

const initialState = loadProjectList();

const store = Store.create({
  projects: initialState,
});

makeInspectable(store);

onSnapshot(store, (snapShot) => saveProjectList(snapShot.projects));

function App() {
  return (
    <StoreProvider value={store}>
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
    </StoreProvider>
  );
}

export default App;
