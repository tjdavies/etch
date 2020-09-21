import { ITypeIn } from "./Type";

export const coreTypes: Record<string, ITypeIn> = {
  string: {
    core: true,
    id: "string",
    name: "string",
    defaultValue: "",
  },
  number: {
    core: true,
    id: "number",
    name: "number",
    defaultValue: 0,
  },
  boolean: {
    core: true,
    id: "boolean",
    name: "boolean",
    defaultValue: false,
  },
  through: {
    core: true,
    id: "through",
    name: "through",
  },
  shape: {
    core: true,
    id: "shape",
    name: "shape",
  },
  scene: {
    core: true,
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
    core: true,
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
