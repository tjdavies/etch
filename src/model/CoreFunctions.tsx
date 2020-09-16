import { IFnIn } from "./Fn";

export const coreFunctionProcesses: Record<string, any> = {
  add: ({ a, b }: Record<string, any>): Record<string, any> => {
    return {
      r: a + b,
    };
  },
  subtract: ({ suba, subb }: Record<string, any>): Record<string, any> => {
    return {
      subr: suba - subb,
    };
  },
  multiply: ({ am, bm }: Record<string, any>): Record<string, any> => {
    return {
      rm: am * bm,
    };
  },
  rect: ({ x, width, y, height }: Record<string, any>): Record<string, any> => {
    return {
      rect: { x, y, width, height },
    };
  },
  branch: ({ data, branch }: Record<string, any>): Record<string, any> => {
    if (branch) {
      return {
        true: data,
      };
    } else {
      return {
        false: data,
      };
    }
  },
  greaterThan: ({ ga, gb }: Record<string, any>): Record<string, any> => {
    return {
      gr: ga > gb,
    };
  },
  select: ({
    select1,
    select2,
    select3,
  }: Record<string, any>): Record<string, any> => {
    console.log(select1);
    if (select1) {
      return {
        selectOut: select2,
      };
    } else {
      return {
        selectOut: select3,
      };
    }
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
      id: "suba",
      name: "A",
      type: "number",
    },
    {
      id: "subb",
      name: "B",
      type: "number",
    },
  ],
  output: [
    {
      id: "subr",
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

const rectFn: IFnIn = {
  id: "rect",
  name: "rect",
  core: true,
  input: [
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
      id: "width",
      name: "height",
      type: "number",
    },
    {
      id: "height",
      name: "height",
      type: "number",
    },
  ],
  output: [
    {
      id: "rect",
      name: "rect",
      type: "shape",
    },
  ],
};

const branchFn: IFnIn = {
  id: "branch",
  name: "branch",
  core: true,
  input: [
    {
      id: "data",
      name: "data",
      type: "through",
    },
    {
      id: "branch",
      name: "switch",
      type: "boolean",
    },
  ],
  output: [
    {
      id: "dataTrue",
      name: "true",
      type: "through",
    },
    {
      id: "dataFalse",
      name: "false",
      type: "through",
    },
  ],
};

const selectFn: IFnIn = {
  id: "select",
  name: "select",
  core: true,
  input: [
    {
      id: "select1",
      name: "switch",
      type: "boolean",
    },
    {
      id: "select2",
      name: "true",
      type: "through",
    },
    {
      id: "select3",
      name: "false",
      type: "through",
    },
  ],
  output: [
    {
      id: "selectOut",
      name: "data",
      type: "through",
    },
  ],
};

const greaterThanFn: IFnIn = {
  id: "greaterThan",
  name: ">",
  core: true,
  input: [
    {
      id: "ga",
      name: "A",
      type: "number",
    },
    {
      id: "gb",
      name: "B",
      type: "number",
    },
  ],
  output: [
    {
      id: "gr",
      name: "A > B",
      type: "boolean",
    },
  ],
};

const splitFn: IFnIn = {
  id: "split",
  name: "split",
  core: true,
  input: [
    {
      id: "split",
      name: "split",
      type: "object",
    },
  ],
  output: [],
};

export const coreFunctions = {
  add: addFn,
  subtract: subtractFn,
  multiply: multiplyFn,
  divide: divideFn,
  rect: rectFn,
  branch: branchFn,
  greaterThan: greaterThanFn,
  select: selectFn,
  split: splitFn,
};
