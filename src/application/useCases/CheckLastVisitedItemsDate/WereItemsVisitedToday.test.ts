import { VisitedItemRepositoryMock } from "../../model/VisitedItemRepository.mock";
import { WereItemsVisitedToday } from "./WereItemsVisitedToday";

describe("check were visited items today use case - tests suite", () => {
  test("execute method should check whether the last visited items date and return true if it is today", () => {
    const repository = new VisitedItemRepositoryMock();
    repository.getLastDate.mockImplementation(() => new Date());
    const wereItemsVisitedToday = new WereItemsVisitedToday(repository);

    const result = wereItemsVisitedToday.execute();

    expect(result).toBe(true);
  });

  test("execute method should check whether the last visited items date and return false if it is not today", () => {
    const repository = new VisitedItemRepositoryMock();
    repository.getLastDate.mockImplementation(() => new Date(2023, 9, 31));
    const wereItemsVisitedToday = new WereItemsVisitedToday(repository);

    const result = wereItemsVisitedToday.execute();

    expect(result).toBe(false);
  });
});
