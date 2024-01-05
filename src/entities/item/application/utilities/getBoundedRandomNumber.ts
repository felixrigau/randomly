export const getBoundedRandomNumber = (start: number, end: number): number => {
  if (start < 0)
    throw new Error("first parameter must be greater than o equal to 0");

  if (start >= end)
    throw new Error("first parameter must be less than second parameter");

  return Math.trunc(Math.random() * (end - start) + start);
};
