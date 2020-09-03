import { IFnIn } from "./Fn";

export const coreFunctionProcesses: Record<string, any> = {
  add: ({ a, b }: Record<string, any>): Record<string, any> => {
    return {
      r: a + b,
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

export const coreFunctions = {
  add: addFn,
};
