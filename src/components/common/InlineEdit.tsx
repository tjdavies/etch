import React from "react";
import styled from "styled-components";
import EdiText, { EdiTextProps } from "react-editext";

const StyledEdiText = styled(EdiText)`
  button {
    display: none;
    background: none;
    border: none;
    margin: 0px;
    padding: 0px;
    min-width: 0px;
  }
  button[editext="edit-button"] {
  }
  button[editext="save-button"] {
  }
  button[editext="cancel-button"] {
  }
  input,
  textarea {
    text-align: ${(p: EdiTextProps) => (p.buttonsAlign ? "right" : "left")};
    padding: 0px;
    margin-bottom: 0px;
    font-size: inherit;
    border: none;

    background: transparent;
    color: inherit;
  }
  div[editext="view-container"] {
    text-align: ${(p: EdiTextProps) => (p.buttonsAlign ? "right" : "left")};
    border-bottom: 1px;
  }
  div[editext="edit-container"] {
    width: 100px;
    text-align: ${(p: EdiTextProps) => (p.buttonsAlign ? "right" : "left")};
    border-bottom: 1px;
  }
`;

export function InlineEdit(props: EdiTextProps) {
  return (
    <StyledEdiText
      tabIndex={1}
      startEditingOnFocus
      submitOnUnfocus
      submitOnEnter
      cancelOnEscape
      hideIcons
      {...props}
    />
  );
}
