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
  list: {
    core: true,
    id: "list",
    name: "list",
    defaultValue: [],
  },
  rect: {
    core: true,
    id: "rect",
    name: "rect",
    params: [
      {
        id: "x",
        name: "x",
        type: "number",
      },
      {
        id: "y",
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
  scene: {
    core: true,
    id: "scene",
    name: "scene",
    params: [
      {
        id: "children",
        name: "children",
        type: "list",
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
