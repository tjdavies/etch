import React from "react";
import styled from "styled-components";

import { IPlug } from "../../../../model/Plug";
import { ParamView } from "../ParamView";

const OutputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

interface Props {
  output: IPlug[];
}

export function TokenOutput({ output }: Props) {
  return (
    <OutputWrapper>
      {output.map((path) => (
        <ParamView path={path} />
      ))}
    </OutputWrapper>
  );
}
