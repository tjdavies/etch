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
  shape: {
    id: "shape",
    name: "shape",
  },
  scene: {
    id: "scene",
    name: "scene",
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
};
