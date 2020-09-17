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
};
