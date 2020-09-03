import { mapInputToValues, calculateFunction } from "./Store";
import { Fn, IFnIn } from "./Fn";
import { coreFunctions } from "./CoreFunctions";
import { generateId } from "../utils/generateId";

test("calculateCoreAddFunction", () => {
  const fn = Fn.create(coreFunctions.add);
  expect(calculateFunction(fn, { a: 2, b: 7 })).toStrictEqual({ r: 9 });
});

test("calculateCustomFunction", () => {
  const inputCountParamter = {
    id: "inCount",
    name: "count",
    type: "number",
  };

  const outputCountParamter = {
    id: "outCount",
    name: "count",
    type: "number",
  };

  const testFn: IFnIn = {
    id: "test",
    name: "test",
    core: false,
    input: [inputCountParamter],
    output: [outputCountParamter],
    wires: [
      {
        id: generateId(),
        from: "test/inCount",
        to: "test/outCount",
      },
    ],
  };

  const fn = Fn.create(testFn);
  expect(calculateFunction(fn, { inCount: 4 })).toStrictEqual({
    outCount: 4,
  });
});
