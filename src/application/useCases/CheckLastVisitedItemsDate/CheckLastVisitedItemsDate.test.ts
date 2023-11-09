import { VisitedItemRepositoryMock } from "../../model/VisitedItemRepository.mock";
import { CheckLastVisitedItemsDate } from "./CheckLastVisitedItemsDate";

describe("check last visited items date use case - tests suite", () => {
  test("execute method should check whether the last visited items date and return true if it is today", () => {
    const repository = new VisitedItemRepositoryMock();
    repository.getLastDate.mockImplementation(() => new Date());
    const checkVisitedItemsDate = new CheckLastVisitedItemsDate(repository);

    const result = checkVisitedItemsDate.execute();

    expect(result).toBe(true);
  });

  test("execute method should check whether the last visited items date and return false if it is not today", () => {
    const repository = new VisitedItemRepositoryMock();
    repository.getLastDate.mockImplementation(() => new Date(2023, 9, 31));
    const checkVisitedItemsDate = new CheckLastVisitedItemsDate(repository);

    const result = checkVisitedItemsDate.execute();

    expect(result).toBe(false);
  });
});
