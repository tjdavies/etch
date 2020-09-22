import React, { useState } from "react";
import styled from "styled-components";
import { Colours } from "../../../Style";
import { MoreVertical } from "grommet-icons";
import { RelativeDropDown } from "../../common/RelativeDropDown";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6px;
  height: 100%;
  border-radius: 1px;
  color: ${Colours.lightGrey};
  cursor: pointer;
`;

const DropDownMenu = styled.div`
  display: flex;
  padding: 6px;
  border: 1px solid ${Colours.lightGrey};
  border-radius: 3px;
  background-color: ${Colours.background};
  li {
    cursor: pointer;
  }
`;

interface Props {
  onDelete: () => void;
}

export function Options({ onDelete }: Props) {
  const [showSelect, setShowSelect] = useState(false);

  return (
    <div>
      {showSelect && (
        <RelativeDropDown onClose={() => setShowSelect(false)}>
          <DropDownMenu>
            <ul>
              <li onClick={onDelete}>delete</li>
            </ul>
          </DropDownMenu>
        </RelativeDropDown>
      )}
      <Box onClick={() => setShowSelect(true)}>
        <MoreVertical size="small" color={Colours.lightGrey} />
      </Box>
    </div>
  );
}
