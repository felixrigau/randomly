import { VisitedItemRepositoryMock } from "../../model/VisitedItemRepository.mock";
import { ClearPreviousVisitedItems } from "./ClearPreviousVisitedItems";

describe("check were visited items today use case - tests suite", () => {
  test("execute method should clear all visited items previously", () => {
    const repository = new VisitedItemRepositoryMock();
    const clearPreviousVisitedItems = new ClearPreviousVisitedItems(repository);

    clearPreviousVisitedItems.execute();

    expect(repository.clear).toBeCalled();
  });
});
