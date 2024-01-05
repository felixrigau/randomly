export const cryptoMock = (function () {
  return {
    randomUUID(): string {
      return Math.random().toString();
    },
  };
})();

Object.defineProperty(window, "crypto", { value: cryptoMock });
