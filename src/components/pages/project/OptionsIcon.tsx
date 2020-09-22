import React from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { MoreVertical } from "grommet-icons";

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6px;
  height: 100%;
  border-radius: 1px;
  color: ${Colours.lightGrey};
  cursor: pointer;
`;

export function OptionsIcon() {
  return (
    <Box>
      <MoreVertical size="small" color={Colours.lightGrey} />
    </Box>
  );
}
