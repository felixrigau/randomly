import { getBoundedRandomNumber } from "./getBoundedRandomNumber";

describe("getBoundedRandomNumber tests suite", () => {
  test("should throw an error if first parameter is less than 0", () => {
    expect(() => getBoundedRandomNumber(-1, 3)).toThrow(
      new Error("first parameter must be greater than o equal to 0")
    );
  });

  test("should throw an error if first parameter greater than or equal to 0", () => {
    expect(() => getBoundedRandomNumber(19, 3)).toThrow(
      new Error("first parameter must be less than second parameter")
    );
  });

  test("should return a number between the setted boundaries by parameters", () => {
    const start = 46,
      end = 100;
    const result = getBoundedRandomNumber(start, end);

    expect(result).toBeGreaterThanOrEqual(start);
    expect(result).toBeLessThanOrEqual(end);
  });
});
