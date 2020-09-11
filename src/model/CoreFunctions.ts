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
  multiply: ({ am, bm }: Record<string, any>): Record<string, any> => {
    return {
      rm: am * bm,
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

const multiplyFn: IFnIn = {
  id: "multiply",
  name: "multiply",
  core: true,
  input: [
    {
      id: "am",
      name: "A",
      type: "number",
    },
    {
      id: "bm",
      name: "B",
      type: "number",
    },
  ],
  output: [
    {
      id: "rm",
      name: "A * B",
      type: "number",
    },
  ],
};

const divideFn: IFnIn = {
  id: "divide",
  name: "divide",
  core: true,
  input: [
    {
      id: "ad",
      name: "A",
      type: "number",
    },
    {
      id: "bd",
      name: "B",
      type: "number",
    },
  ],
  output: [
    {
      id: "rd",
      name: "A / B",
      type: "number",
    },
  ],
};

export const coreFunctions = {
  add: addFn,
  subtract: subtractFn,
  multiply: multiplyFn,
  divide: divideFn,
};
