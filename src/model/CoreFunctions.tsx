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
  greaterThan: ({ ga, gb }: Record<string, any>): Record<string, any> => {
    return {
      gr: ga > gb,
    };
  },
  lessThan: ({ la, lb }: Record<string, any>): Record<string, any> => {
    return {
      lr: la < lb,
    };
  },
  lessThanEql: ({
    lessThanOrEqla,
    lessThanOrEqlb,
  }: Record<string, any>): Record<string, any> => {
    return {
      lessThanOrEqlr: lessThanOrEqla <= lessThanOrEqlb,
    };
  },
  greaterThanEql: ({
    greaterThanOrEqla,
    greaterThanOrEqlb,
  }: Record<string, any>): Record<string, any> => {
    return {
      greaterThanOrEqlr: greaterThanOrEqla >= greaterThanOrEqlb,
    };
  },
  equal: ({ ea, eb }: Record<string, any>): Record<string, any> => {
    return {
      er: ea === eb,
    };
  },
  and: ({ aa, ab }: Record<string, any>): Record<string, any> => {
    return {
      ar: aa && ab,
    };
  },
  or: ({ oa, ob }: Record<string, any>): Record<string, any> => {
    return {
      or: oa || ob,
    };
  },
  select: ({
    select1,
    select2,
    select3,
  }: Record<string, any>): Record<string, any> => {
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
  push: ({
    pushArray,
    pushValue,
  }: Record<string, any>): Record<string, any> => {
    return {
      pushReturn: [...pushArray, pushValue],
    };
  },
  contains: ({
    containsList,
    containsValue,
  }: Record<string, any>): Record<string, any> => {
    return {
      containsReturn: containsList.includes(containsValue),
    };
  },
  clamp: ({
    clampValue,
    clampMin,
    clampMax,
  }: Record<string, any>): Record<string, any> => {
    return {
      clampedValue: Math.min(clampMax, Math.max(clampMin, clampValue)),
    };
  },
  isKeyDown: ({
    isKeyDownInput,
    isKeyDownValue,
  }: Record<string, any>): Record<string, any> => {
    return {
      isKeyDownOut: isKeyDownInput.keysDown.includes(isKeyDownValue),
    };
  },
  draw: ({
    drawScene,
    drawShape,
  }: Record<string, any>): Record<string, any> => {
    return {
      drawSceneOut: {
        ...drawScene,
        children: [...drawScene.children, { ...drawShape, type: "rect" }],
      },
    };
  },
  not: ({ notA }: Record<string, any>): Record<string, any> => {
    return {
      notR: !notA,
    };
  },
  drawText: ({
    drawTextScene,
    drawText,
  }: Record<string, any>): Record<string, any> => {
    return {
      drawTextOut: {
        ...drawTextScene,
        children: [...drawTextScene.children, { ...drawText, type: "text" }],
      },
    };
  },
};

const notFn: IFnIn = {
  id: "not",
  name: "NOT",
  core: true,
  input: [
    {
      id: "notA",
      name: "A",
      type: "boolean",
    },
  ],
  output: [
    {
      id: "notR",
      name: "not A",
      type: "boolean",
    },
  ],
};

const addFn: IFnIn = {
  id: "add",
  name: "+",
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
  name: "-",
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
  name: "×",
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
  name: "/",
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

const selectFn: IFnIn = {
  id: "select",
  name: "select",
  core: true,
  defaultSelectedType: "number",
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

const andFn: IFnIn = {
  id: "and",
  name: "AND",
  core: true,
  input: [
    {
      id: "aa",
      name: "A",
      type: "boolean",
    },
    {
      id: "ab",
      name: "B",
      type: "boolean",
    },
  ],
  output: [
    {
      id: "ar",
      name: "A AND B",
      type: "boolean",
    },
  ],
};

const orFn: IFnIn = {
  id: "or",
  name: "OR",
  core: true,
  input: [
    {
      id: "oa",
      name: "A",
      type: "boolean",
    },
    {
      id: "ob",
      name: "B",
      type: "boolean",
    },
  ],
  output: [
    {
      id: "or",
      name: "A OR B",
      type: "boolean",
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

const lessThanFn: IFnIn = {
  id: "lessThan",
  name: "<",
  core: true,
  input: [
    {
      id: "la",
      name: "A",
      type: "number",
    },
    {
      id: "lb",
      name: "B",
      type: "number",
    },
  ],
  output: [
    {
      id: "lr",
      name: "A < B",
      type: "boolean",
    },
  ],
};

const equalFn: IFnIn = {
  id: "equal",
  name: "=",
  core: true,
  input: [
    {
      id: "ea",
      name: "A",
      type: "through",
    },
    {
      id: "eb",
      name: "B",
      type: "through",
    },
  ],
  output: [
    {
      id: "er",
      name: "A = B",
      type: "boolean",
    },
  ],
};

const lessThanEqlFn: IFnIn = {
  id: "lessThanEql",
  name: "<=",
  core: true,
  input: [
    {
      id: "lessThanOrEqla",
      name: "A",
      type: "number",
    },
    {
      id: "lessThanOrEqlb",
      name: "B",
      type: "number",
    },
  ],
  output: [
    {
      id: "lessThanOrEqlr",
      name: "A <= B",
      type: "boolean",
    },
  ],
};

const greaterThanEqlFn: IFnIn = {
  id: "greaterThanEql",
  name: ">=",
  core: true,
  input: [
    {
      id: "greaterThanOrEqla",
      name: "A",
      type: "number",
    },
    {
      id: "greaterThanOrEqlb",
      name: "B",
      type: "number",
    },
  ],
  output: [
    {
      id: "greaterThanOrEqlr",
      name: "A >= B",
      type: "boolean",
    },
  ],
};

const pushFn: IFnIn = {
  id: "push",
  name: "push",
  core: true,
  input: [
    {
      id: "pushArray",
      name: "list",
      type: "list",
    },
    {
      id: "pushValue",
      name: "value",
      type: "through",
    },
  ],
  output: [
    {
      id: "pushReturn",
      name: "list",
      type: "list",
    },
  ],
};

const containsFn: IFnIn = {
  id: "contains",
  name: "contains",
  core: true,
  input: [
    {
      id: "containsList",
      name: "list",
      type: "list",
    },
    {
      id: "containsValue",
      name: "value",
      type: "through",
    },
  ],
  output: [
    {
      id: "containsReturn",
      name: "contains",
      type: "boolean",
    },
  ],
};

const clampFn: IFnIn = {
  id: "clamp",
  name: "clamp",
  core: true,
  input: [
    {
      id: "clampValue",
      name: "value",
      type: "number",
    },
    {
      id: "clampMin",
      name: "min",
      type: "number",
    },
    {
      id: "clampMax",
      name: "max",
      type: "number",
    },
  ],
  output: [
    {
      id: "clampedValue",
      name: "value",
      type: "number",
    },
  ],
};

const isKeyDownFn: IFnIn = {
  id: "isKeyDown",
  name: "isKeyDown",
  core: true,
  input: [
    {
      id: "isKeyDownInput",
      name: "input",
      type: "input",
    },
    {
      id: "isKeyDownValue",
      name: "keyName",
      type: "string",
    },
  ],
  output: [
    {
      id: "isKeyDownOut",
      name: "value",
      type: "boolean",
    },
  ],
};

const drawFn: IFnIn = {
  id: "draw",
  name: "draw rectangle",
  core: true,
  input: [
    {
      id: "drawScene",
      name: "scene",
      type: "scene",
    },
    {
      id: "drawShape",
      name: "shape",
      type: "rect",
    },
  ],
  output: [
    {
      id: "drawSceneOut",
      name: "scene",
      type: "scene",
    },
  ],
};

const drawTextFn: IFnIn = {
  id: "drawText",
  name: "draw text",
  core: true,
  input: [
    {
      id: "drawTextScene",
      name: "scene",
      type: "scene",
    },
    {
      id: "drawText",
      name: "text",
      type: "text",
    },
  ],
  output: [
    {
      id: "drawTextOut",
      name: "scene",
      type: "scene",
    },
  ],
};

export const coreFunctions = {
  add: addFn,
  subtract: subtractFn,
  multiply: multiplyFn,
  divide: divideFn,
  greaterThan: greaterThanFn,
  lessThan: lessThanFn,
  lessThanEql: lessThanEqlFn,
  greaterThanEql: greaterThanEqlFn,
  equal: equalFn,
  not: notFn,
  and: andFn,
  or: orFn,
  select: selectFn,
  clamp: clampFn,
  isKeyDown: isKeyDownFn,
  draw: drawFn,
  drawText: drawTextFn,
};
