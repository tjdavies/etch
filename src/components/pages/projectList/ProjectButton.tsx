import styled from "styled-components";
import { Colours } from "../../../Style";

export const ProjectButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  color: ${Colours.white};
  font-weight: bold;
  font-size: 20px;
  background-color: ${Colours.secondary};
  border-radius: 8px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const ProjectButtonNew = styled(ProjectButton)`
  background-color: ${Colours.primary};
  text-align: center;
  line-height: 1.6;
`;
