export class NoMoreItemsError extends Error {
  constructor() {
    super();
    this.message = "There are no more items to visit";
  }
}
