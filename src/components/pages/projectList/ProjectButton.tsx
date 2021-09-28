import styled from "styled-components";
import { Colours } from "../../../Style";
import { ReactComponent as ForkIcon } from "../../../assets/fork.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/delete.svg";

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
  text-align: center;
  line-height: 1.6;
  padding: 12px;
`;

export const ProjectButtonNew = styled(ProjectButton)`
  background-color: ${Colours.primary};
`;

export const StyledForkIcon = styled(ForkIcon)`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 30px;
  fill: white;
  transform: rotate(90deg);
`;

export const StyledDeleteIcon = styled(DeleteIcon)`
  position: absolute;
  top: 20px;
  right: 50px;
  height: 25px;
  fill: white;
`;
