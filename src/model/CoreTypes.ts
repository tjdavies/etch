import { ITypeIn } from "./Type";

export const coreTypes: Record<string, ITypeIn> = {
  string: {
    id: "string",
    name: "string",
  },
  number: {
    id: "number",
    name: "number",
  },
  boolean: {
    id: "boolean",
    name: "boolean",
  },
  through: {
    id: "through",
    name: "through",
  },
  shape: {
    id: "shape",
    name: "shape",
  },
  scene: {
    id: "scene",
    name: "scene",
    params: [
      {
        id: "scenex",
        name: "x",
        type: "number",
      },
      {
        id: "sceney",
        name: "y",
        type: "number",
      },
      {
        id: "height",
        name: "height",
        type: "number",
      },
      {
        id: "width",
        name: "width",
        type: "number",
      },
    ],
  },
  input: {
    id: "input",
    name: "input",
    params: [
      {
        id: "upArrow",
        name: "upArrow",
        type: "boolean",
      },
      {
        id: "downArrow",
        name: "downArrow",
        type: "boolean",
      },
      {
        id: "rightArrow",
        name: "rightArrow",
        type: "boolean",
      },
      {
        id: "leftArrow",
        name: "leftArrow",
        type: "boolean",
      },
    ],
  },
};
