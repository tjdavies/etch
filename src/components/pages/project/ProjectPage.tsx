import React, { useEffect, useState } from "react";
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
  const { id, fn, context } = useParams();

  const store = useProjectStore(id, fn, context);
  store?.setActiveFunction(fn);
  store?.setFunctionContext(context);
  if (store !== undefined) {
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

function useProjectStore(id: string, fn: string, context: string) {
  const [storeState, setStore] = useState<IStore>();

  useEffect(() => {
    const initialState = loadProject(id);
    if (initialState) {
      const store = Store.create({
        project: initialState,
        activeFunction: fn || initialState.mainFn,
        functionContext: context,
        runTimeViewMode: "docked",
      });

      makeInspectable(store);

      onSnapshot(store, (snapShot) => saveProject(snapShot.project));

      (window as any).out = () => {
        console.log(getSnapshot(store));
      };

      setStore(store);
    }
  }, [id]);

  return storeState;
}
