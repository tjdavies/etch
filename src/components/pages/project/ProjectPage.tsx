import React from "react";
import styled from "styled-components";

import { PageHeader } from "../../common/Header";
import { useParams } from "react-router-dom";

import { Store, IStore, StoreProvider } from "../../../model/Store";
import { loadProject, saveProject } from "../../../utils/Save";
import { onSnapshot, getSnapshot } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";
import { ProjectView } from "./ProjectView";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Error = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProjectPage = () => {
  const { id } = useParams();

  const initialState = loadProject(id);

  console.log(initialState);

  if (initialState) {
    const store: IStore = Store.create({
      project: initialState,
      activeFunction: initialState.mainFn,
    });

    makeInspectable(store);

    onSnapshot(store, (snapShot) => saveProject(snapShot.project));

    (window as any).out = () => {
      console.log(getSnapshot(store));
    };

    return (
      <PageWrapper>
        <StoreProvider value={store}>
          <ProjectView store={store} />
        </StoreProvider>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageHeader />
      <Error>Sorry, no project found</Error>
    </PageWrapper>
  );
};
