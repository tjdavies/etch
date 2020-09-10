import { IFnIn } from "./Fn";

export const coreFunctionProcesses: Record<string, any> = {
  add: ({ a, b }: Record<string, any>): Record<string, any> => {
    return {
      r: a + b,
    };
  },
  subtract: ({ as, bs }: Record<string, any>): Record<string, any> => {
    return {
      rs: as - bs,
    };
  },
};

const addFn: IFnIn = {
  id: "add",
  name: "add",
  core: true,
  input: [
    {
      id: "a",
      name: "A",
      type: "number",
    },
    {
      id: "b",
      name: "B",
      type: "number",
    },
  ],
  output: [
    {
      id: "r",
      name: "A + B",
      type: "number",
    },
  ],
};

const subtractFn: IFnIn = {
  id: "subtract",
  name: "subtract",
  core: true,
  input: [
    {
      id: "as",
      name: "A",
      type: "number",
    },
    {
      id: "bs",
      name: "B",
      type: "number",
    },
  ],
  output: [
    {
      id: "rs",
      name: "A - B",
      type: "number",
    },
  ],
};

export const coreFunctions = {
  add: addFn,
  subtract: subtractFn,
};
