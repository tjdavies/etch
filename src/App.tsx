import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ProjectListPage } from "./components/pages/projectList/ProjectListPage";
import { Colours } from "./Style";
import { Routes } from "./Routes";
import { ProjectPage } from "./components/pages/project/ProjectPage";
import { Store, StoreProvider } from "./model/Store";
import { loadProjectList, saveProjectList } from "./utils/Save";
import { onSnapshot, getSnapshot } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";

const AppWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${Colours.background};
  overflow: hidden;
`;

const initialState = loadProjectList();

const store = Store.create({
  projects: initialState,
});

makeInspectable(store);

onSnapshot(store, (snapShot) => saveProjectList(snapShot.projects));

(window as any).out = () => {
  console.log(getSnapshot(store));
};

function App() {
  return (
    <StoreProvider value={store}>
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
    </StoreProvider>
  );
}

export default App;
