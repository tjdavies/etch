import { Project } from "./Project";
import {
  types,
  Instance,
  clone,
  getType,
  isStateTreeNode,
} from "mobx-state-tree";
import { generateId } from "../utils/generateId";
import { createContext, useContext } from "react";
import { IFnIn, IFn, Fn } from "./Fn";
import { IPoint } from "./Point";
import { coreFunctions, coreFunctionProcesses } from "./CoreFunctions";
import { IPath, Path } from "./Path";
import { IWire } from "./Wire";
import { Token, IToken } from "./Token";
import { coreTypes } from "./CoreTypes";
import { ITypeIn } from "./Type";
import { ISocket } from "./Sockets";
import { IPlug } from "./Plug";
import { IKeyValueMap } from "mobx";
import { any, assocPath, hasPath, mergeDeepLeft, path } from "ramda";

export const Store = types
  .model("store", {
    project: Project,
    activeFunction: types.reference(Fn),
    activeDrag: types.maybe(Path),
    activeSocket: types.maybe(Path),
  })
  .actions((self) => ({
    activeDragPlug(drag: IPath) {
      self.activeDrag = clone(drag);
    },
    startDrag(drag: IPath) {
      if (isStateTreeNode(drag)) {
        self.activeDrag = clone(drag);
      } else {
        self.activeDrag = drag;
      }
    },
    stopDrag() {
      if (self.activeDrag) {
        const index = self.activeFunction.wires.findIndex(
          (i: any) => i.to.path === self.activeDrag?.path
        );

        if (self.activeSocket) {
          self.activeSocket.target.removeValue(self.activeSocket.path);

          if (index > -1) {
            self.activeFunction.wires[index].to = clone(self.activeSocket);
          } else {
            self.activeFunction.wires.push({
              id: self.activeSocket.path,
              from: clone(self.activeDrag),
              to: clone(self.activeSocket),
            });
          }
        } else {
          if (index > -1) {
            self.activeFunction.wires.splice(index, 1);
          }
        }
      }

      self.activeDrag = undefined;
    },
    setActiveFunction(fn: IFn) {
      self.activeFunction = fn;
    },
    setActiveSocket(param: IPath | undefined) {
      self.activeSocket = param;
    },
    createNewFunction(position: IPoint, name: string) {
      const newFn: IFnIn = {
        id: generateId(),
        core: false,
        name,
        input: [],
        output: [],
      };

      self.project.functions.put(newFn);
      const f = self.project.functions.get(newFn.id);
      if (f) {
        self.activeFunction?.addToken(position, f);
      }
    },
  }));

export interface IStore extends Instance<typeof Store> {}

const f = {
  id: "7sf2pafw6z9bptvy981a3",
  name: "Project4",
  functions: {
    add: {
      id: "add",
      name: "add",
      core: true,
      input: [
        { id: "a", name: "A", type: "number" },
        { id: "b", name: "B", type: "number" },
      ],
      output: [{ id: "r", name: "A + B", type: "number" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    subtract: {
      id: "subtract",
      name: "subtract",
      core: true,
      input: [
        { id: "suba", name: "A", type: "number" },
        { id: "subb", name: "B", type: "number" },
      ],
      output: [{ id: "subr", name: "A - B", type: "number" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    multiply: {
      id: "multiply",
      name: "multiply",
      core: true,
      input: [
        { id: "am", name: "A", type: "number" },
        { id: "bm", name: "B", type: "number" },
      ],
      output: [{ id: "rm", name: "A * B", type: "number" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    divide: {
      id: "divide",
      name: "divide",
      core: true,
      input: [
        { id: "ad", name: "A", type: "number" },
        { id: "bd", name: "B", type: "number" },
      ],
      output: [{ id: "rd", name: "A / B", type: "number" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    greaterThan: {
      id: "greaterThan",
      name: ">",
      core: true,
      input: [
        { id: "ga", name: "A", type: "number" },
        { id: "gb", name: "B", type: "number" },
      ],
      output: [{ id: "gr", name: "A > B", type: "boolean" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    lessThan: {
      id: "lessThan",
      name: "<",
      core: true,
      input: [
        { id: "la", name: "A", type: "number" },
        { id: "lb", name: "B", type: "number" },
      ],
      output: [{ id: "lr", name: "A < B", type: "boolean" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    select: {
      id: "select",
      name: "select",
      core: true,
      input: [
        { id: "select1", name: "switch", type: "boolean" },
        { id: "select2", name: "true", type: "through" },
        { id: "select3", name: "false", type: "through" },
      ],
      output: [{ id: "selectOut", name: "data", type: "through" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    equal: {
      id: "equal",
      name: "=",
      core: true,
      input: [
        { id: "ea", name: "A", type: "through" },
        { id: "eb", name: "B", type: "through" },
      ],
      output: [{ id: "er", name: "A = B", type: "boolean" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    and: {
      id: "and",
      name: "AND",
      core: true,
      input: [
        { id: "aa", name: "A", type: "number" },
        { id: "ab", name: "B", type: "number" },
      ],
      output: [{ id: "ar", name: "A AND B", type: "boolean" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    or: {
      id: "or",
      name: "OR",
      core: true,
      input: [
        { id: "oa", name: "A", type: "number" },
        { id: "ob", name: "B", type: "number" },
      ],
      output: [{ id: "or", name: "A OR B", type: "boolean" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    push: {
      id: "push",
      name: "push",
      core: true,
      input: [
        { id: "pushArray", name: "list", type: "list" },
        { id: "pushValue", name: "value", type: "number" },
      ],
      output: [{ id: "pushReturn", name: "list", type: "list" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    lessThanEql: {
      id: "lessThanEql",
      name: "<=",
      core: true,
      input: [
        { id: "lessThanOrEqla", name: "A", type: "number" },
        { id: "lessThanOrEqlb", name: "B", type: "number" },
      ],
      output: [{ id: "lessThanOrEqlr", name: "A <= B", type: "boolean" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    greaterThanEql: {
      id: "greaterThanEql",
      name: ">=",
      core: true,
      input: [
        { id: "greaterThanOrEqla", name: "A", type: "number" },
        { id: "greaterThanOrEqlb", name: "B", type: "number" },
      ],
      output: [{ id: "greaterThanOrEqr", name: "A >= B", type: "boolean" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
    lup3gcsir8n3ix7jdvhph: {
      id: "lup3gcsir8n3ix7jdvhph",
      name: "main",
      core: false,
      input: [
        { id: "state", name: "state", type: "state" },
        { id: "input", name: "input", type: "input" },
      ],
      output: [
        { id: "j7hq5t9fjniwptj8hqdxf", name: "state", type: "state" },
        { id: "w3buukobwkqihlcyek08gm", name: "scene", type: "scene" },
      ],
      tokens: [
        {
          id: "fkse6zskqxaxv7gs0ingqp",
          position: { x: 318, y: -50 },
          fn: "juj4lyvbfrqqpidozu71m",
          values: {},
          expandedParams: {},
        },
        {
          id: "jk62a8kw5an4x269k4pm8",
          position: { x: 829, y: 108 },
          fn: "jm3lc1slldwo6k7vuuu5",
          values: {},
          expandedParams: {},
        },
      ],
      wires: [
        {
          id: "fkse6zskqxaxv7gs0ingqp.dzxeucqcofplf8r3z5df8",
          from: {
            target: "lup3gcsir8n3ix7jdvhph",
            param: "state",
            path: "lup3gcsir8n3ix7jdvhph.state",
          },
          to: {
            target: "fkse6zskqxaxv7gs0ingqp",
            param: "dzxeucqcofplf8r3z5df8",
            path: "fkse6zskqxaxv7gs0ingqp.dzxeucqcofplf8r3z5df8",
          },
        },
        {
          id: "lup3gcsir8n3ix7jdvhph.j7hq5t9fjniwptj8hqdxf",
          from: {
            target: "fkse6zskqxaxv7gs0ingqp",
            param: "6p0dkr4icqdoqfzzn1ci7f",
            path: "fkse6zskqxaxv7gs0ingqp.6p0dkr4icqdoqfzzn1ci7f",
          },
          to: {
            target: "lup3gcsir8n3ix7jdvhph",
            param: "j7hq5t9fjniwptj8hqdxf",
            path: "lup3gcsir8n3ix7jdvhph.j7hq5t9fjniwptj8hqdxf",
          },
        },
        {
          id: "jk62a8kw5an4x269k4pm8.06chbzwndnnv7ej79h111d3",
          from: {
            target: "fkse6zskqxaxv7gs0ingqp",
            param: "6p0dkr4icqdoqfzzn1ci7f",
            path: "fkse6zskqxaxv7gs0ingqp.6p0dkr4icqdoqfzzn1ci7f",
          },
          to: {
            target: "jk62a8kw5an4x269k4pm8",
            param: "06chbzwndnnv7ej79h111d3",
            path: "jk62a8kw5an4x269k4pm8.06chbzwndnnv7ej79h111d3",
          },
        },
        {
          id: "lup3gcsir8n3ix7jdvhph.w3buukobwkqihlcyek08gm",
          from: {
            target: "jk62a8kw5an4x269k4pm8",
            param: "gy6jkwawe3et4wiwx2cj0e",
            path: "jk62a8kw5an4x269k4pm8.gy6jkwawe3et4wiwx2cj0e",
          },
          to: {
            target: "lup3gcsir8n3ix7jdvhph",
            param: "w3buukobwkqihlcyek08gm",
            path: "lup3gcsir8n3ix7jdvhph.w3buukobwkqihlcyek08gm",
          },
        },
        {
          id: "fkse6zskqxaxv7gs0ingqp.r5k4xxambvie9dfq3r18",
          from: {
            target: "lup3gcsir8n3ix7jdvhph",
            param: "input",
            path: "lup3gcsir8n3ix7jdvhph.input",
          },
          to: {
            target: "fkse6zskqxaxv7gs0ingqp",
            param: "r5k4xxambvie9dfq3r18",
            path: "fkse6zskqxaxv7gs0ingqp.r5k4xxambvie9dfq3r18",
          },
        },
      ],
      values: {},
      expandedParams: {},
    },
    juj4lyvbfrqqpidozu71m: {
      id: "juj4lyvbfrqqpidozu71m",
      name: "update",
      core: false,
      input: [
        { id: "dzxeucqcofplf8r3z5df8", name: "state", type: "state" },
        { id: "r5k4xxambvie9dfq3r18", name: "input", type: "input" },
      ],
      output: [{ id: "6p0dkr4icqdoqfzzn1ci7f", name: "state", type: "state" }],
      tokens: [],
      wires: [
        {
          id: "juj4lyvbfrqqpidozu71m.6p0dkr4icqdoqfzzn1ci7f",
          from: {
            target: "juj4lyvbfrqqpidozu71m",
            param: "dzxeucqcofplf8r3z5df8",
            path: "juj4lyvbfrqqpidozu71m.dzxeucqcofplf8r3z5df8",
          },
          to: {
            target: "juj4lyvbfrqqpidozu71m",
            param: "6p0dkr4icqdoqfzzn1ci7f",
            path: "juj4lyvbfrqqpidozu71m.6p0dkr4icqdoqfzzn1ci7f",
          },
        },
      ],
      values: {},
      expandedParams: {},
    },
    jm3lc1slldwo6k7vuuu5: {
      id: "jm3lc1slldwo6k7vuuu5",
      name: "view",
      core: false,
      input: [{ id: "06chbzwndnnv7ej79h111d3", name: "state", type: "state" }],
      output: [{ id: "gy6jkwawe3et4wiwx2cj0e", name: "scene", type: "scene" }],
      tokens: [],
      wires: [],
      values: {},
      expandedParams: {},
    },
  },
  mainFn: "lup3gcsir8n3ix7jdvhph",
  types: {
    string: { id: "string", name: "string", core: true, defaultValue: "" },
    number: { id: "number", name: "number", core: true, defaultValue: 0 },
    boolean: {
      id: "boolean",
      name: "boolean",
      core: true,
      defaultValue: false,
    },
    through: { id: "through", name: "through", core: true },
    list: { id: "list", name: "list", core: true, defaultValue: [] },
    rect: {
      id: "rect",
      name: "rect",
      params: [
        { id: "x", name: "x", type: "number" },
        { id: "y", name: "y", type: "number" },
        { id: "height", name: "height", type: "number" },
        { id: "width", name: "width", type: "number" },
      ],
      core: true,
    },
    scene: {
      id: "scene",
      name: "scene",
      params: [{ id: "children", name: "children", type: "list" }],
      core: true,
    },
    input: {
      id: "input",
      name: "input",
      params: [
        { id: "upArrow", name: "upArrow", type: "boolean" },
        { id: "downArrow", name: "downArrow", type: "boolean" },
        { id: "rightArrow", name: "rightArrow", type: "boolean" },
        { id: "leftArrow", name: "leftArrow", type: "boolean" },
      ],
      core: true,
    },
    state: { id: "state", name: "state", params: [], core: false },
  },
};

export function createNewProject(name: string) {
  const stateParamter = {
    id: "state",
    name: "state",
    type: "state",
  };

  const inputParamter = {
    id: "input",
    name: "input",
    type: "input",
  };

  const outputCountParamter = {
    id: generateId(),
    name: "scene",
    type: "scene",
  };

  const outputStateParamter = {
    id: generateId(),
    name: "state",
    type: "state",
  };

  const mainFn: IFnIn = {
    id: generateId(),
    name: "main",
    core: false,
    input: [stateParamter, inputParamter],
    output: [outputStateParamter, outputCountParamter],
  };

  const updateFn: IFnIn = {
    id: "juj4lyvbfrqqpidozu71m",
    name: "update",
    core: false,
    input: [
      { id: "dzxeucqcofplf8r3z5df8", name: "state", type: "state" },
      { id: "r5k4xxambvie9dfq3r18", name: "input", type: "input" },
    ],
    output: [{ id: "6p0dkr4icqdoqfzzn1ci7f", name: "state", type: "state" }],
    tokens: [],
    wires: [
      {
        id: "juj4lyvbfrqqpidozu71m.6p0dkr4icqdoqfzzn1ci7f",
        from: {
          target: "juj4lyvbfrqqpidozu71m",
          param: "dzxeucqcofplf8r3z5df8",
          path: "juj4lyvbfrqqpidozu71m.dzxeucqcofplf8r3z5df8",
        },
        to: {
          target: "juj4lyvbfrqqpidozu71m",
          param: "6p0dkr4icqdoqfzzn1ci7f",
          path: "juj4lyvbfrqqpidozu71m.6p0dkr4icqdoqfzzn1ci7f",
        },
      },
    ],
    values: {},
    expandedParams: {},
  };

  const viewfn = {
    id: "jm3lc1slldwo6k7vuuu5",
    name: "view",
    core: false,
    input: [{ id: "06chbzwndnnv7ej79h111d3", name: "state", type: "state" }],
    output: [{ id: "gy6jkwawe3et4wiwx2cj0e", name: "scene", type: "scene" }],
    tokens: [],
    wires: [],
    values: {},
    expandedParams: {},
  };

  const state: ITypeIn = {
    id: "state",
    name: "state",
    core: false,
    params: [],
  };

  return {
    id: generateId(),
    name: name,
    functions: {
      ...coreFunctions,
      [mainFn.id]: mainFn,
      [updateFn.id]: updateFn,
      [viewfn.id]: viewfn,
    },
    mainFn: mainFn.id,
    types: { ...coreTypes, state },
  };
}

export function calculateFunction(
  fn: IFn,
  inputValue: Record<string, any>
): Record<string, any> | null {
  if (fn.core) {
    return (coreFunctionProcesses[fn.id] as any)(inputValue);
  }

  const calculatedState = { [fn.id]: inputValue };

  const constValues = fn.values.toJSON();
  const unFlatConst = unFlatten(constValues);

  const combinedState = mergeDeepLeft(calculatedState, unFlatConst);

  const output: any = getValuesForSockets(fn, fn.sockets, combinedState);

  const results = output[fn.id];

  return results;
}

function unFlatten(constValues: IKeyValueMap<any>): any {
  return Object.entries(constValues).reduce(
    (accumulator: any, keyValue: any) => {
      return setValue(keyValue[0], keyValue[1], accumulator);
    },
    {}
  );
}

function getValue(p: string, object: any): any {
  return path(p.split("."), object);
}

function setValue(path: string, value: any, object: Object): Object {
  return assocPath(path.split("."), value, object);
}

function getValuesForSockets(
  fn: IFn,
  sockets: ISocket[],
  calculatedState: Object
): Object {
  return sockets.reduce((accumulator, socket) => {
    const wire = socket.connection;

    if (wire) {
      return findPlugValue(fn, wire, accumulator);
    } else if (socket.params) {
      return getValuesForSockets(fn, socket.params, accumulator);
    } else {
      return accumulator;
    }
  }, calculatedState);
}

function findPlugValue(fn: IFn, wire: IWire, calculatedState: Object) {
  const val = getValue(wire.from.path, calculatedState);
  if (val !== undefined) {
    return setValue(wire.to.path, val, calculatedState);
  } else {
    if (getType(wire.from.target) === Token) {
      const token = wire.from.target as IToken;

      const computedValues: any = getValuesForSockets(
        fn,
        token.sockets,
        calculatedState
      );

      const outPutValue = runToken(token, computedValues);

      if (outPutValue) {
        const outValue = outPutValue[wire.from.param.id];
        const cc = setValue(wire.from.path, outValue, computedValues);
        const c = setValue(wire.to.path, outValue, cc);
        return c;
      }

      return computedValues;
    } else {
      return setValue(
        wire.from.path,
        wire.from.param.type.defaultValue,
        calculatedState
      );
    }
  }
}

function runToken(token: IToken, plugValues: Object) {
  console.log(token.fn.name);
  console.log(token);
  const input = mapSocketsToValues(token, plugValues);
  console.log(input);

  const r = calculateFunction(token.fn, input);
  console.log(r);
  return r;
}

function mapSocketsToValues(token: IToken, plugValues: Record<string, any>) {
  return token.sockets.reduce((accumulator, socket) => {
    const wire = socket.connection;
    if (wire) {
      return {
        [socket.param.id]: path(wire.from.path.split("."), plugValues),
        ...accumulator,
      };
    }

    if (socket.value !== undefined) {
      return {
        [socket.param.id]: socket.value,
        ...accumulator,
      };
    } else {
      return {
        [socket.param.id]: socket.param.type.defaultValue,
        ...accumulator,
      };
    }
  }, {});
}

export function findWireTo(wires: IWire[], path: string): IWire | undefined {
  return wires.find((wire) => wire.to.path === path);
}

export function mapOutputToValues(
  plugs: IPath[],
  value: Record<string, any>
): Record<string, any> {
  return plugs.reduce((accumulator, plug) => {
    return {
      ...accumulator,
      [plug.param.name]: value[plug.param.id],
    };
  }, {});
}

export interface IStore extends Instance<typeof Store> {}
const StoreContext = createContext<null | IStore>(null);

export const StoreProvider = StoreContext.Provider;
export function useStore() {
  const store = useContext(StoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

export function log<T>(t: T): T {
  console.log(t);
  return t;
}
