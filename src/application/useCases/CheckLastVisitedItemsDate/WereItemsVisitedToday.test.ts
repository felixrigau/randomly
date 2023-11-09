import { VisitedItemRepositoryMock } from "../../model/VisitedItemRepository.mock";
import { WereItemsVisitedToday } from "./WereItemsVisitedToday";

describe("check were visited items today use case - tests suite", () => {
  test("execute method should check whether items were visited today and return true if so", () => {
    const repository = new VisitedItemRepositoryMock();
    repository.getLastDate.mockImplementation(() => new Date());
    const wereItemsVisitedToday = new WereItemsVisitedToday(repository);

    const result = wereItemsVisitedToday.execute();

    expect(result).toBe(true);
  });

  test("execute method should check whether items were visited today and return false if not so", () => {
    const repository = new VisitedItemRepositoryMock();
    repository.getLastDate.mockImplementation(() => new Date(2023, 9, 31));
    const wereItemsVisitedToday = new WereItemsVisitedToday(repository);

    const result = wereItemsVisitedToday.execute();

    expect(result).toBe(false);
  });
});