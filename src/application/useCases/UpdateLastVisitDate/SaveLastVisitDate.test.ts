import { SaveLastVisitDate } from "./SaveLastVisitDate";
import { VisitedItemRepositoryMock } from "../../model/VisitedItemRepository.mock";

describe("remove item use case - tests suite", () => {
  test("execute method should call the remove repository method receiving the id as a parameter", () => {
    const visitedItemsRepository = new VisitedItemRepositoryMock(),
      saveLastVisitDate = new SaveLastVisitDate(visitedItemsRepository),
      currentDate = new Date();

    saveLastVisitDate.execute(currentDate);

    expect(visitedItemsRepository.saveLastRequestDate).toBeCalledWith(
      currentDate
    );
  });
});
