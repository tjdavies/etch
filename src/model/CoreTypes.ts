import { ITypeIn } from "./Type";

export const TypeColours: any = {
  string: "#b48fd1",
  number: "#df5e88",
  boolean: "#8fcfd1",
};

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
  colour: {
    core: true,
    id: "colour",
    name: "colour",
    defaultValue: "#F00",
  },
  imageSrc: {
    core: true,
    id: "imageSrc",
    name: "image source",
    defaultValue: "/sprites/Jump.png",
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
      {
        id: "colour",
        name: "colour",
        type: "colour",
      },
    ],
  },
  text: {
    core: true,
    id: "text",
    name: "text",
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
        id: "text",
        name: "text",
        type: "string",
      },
      {
        id: "colour",
        name: "colour",
        type: "colour",
      },
      {
        id: "fontSize",
        name: "font size",
        type: "number",
      },
    ],
  },
  image: {
    core: true,
    id: "image",
    name: "image",
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
      {
        id: "imageSrc",
        name: "image source",
        type: "imageSrc",
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
        id: "keysDown",
        name: "keysDown",
        type: "list",
      },
    ],
  },
};
