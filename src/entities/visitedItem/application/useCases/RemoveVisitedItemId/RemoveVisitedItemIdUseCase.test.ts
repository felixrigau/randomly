import { RemoveVisitedItemIdUseCase } from "./RemoveVisitedItemIdUseCase";
import { VisitedItemRepositoryMock } from "../../domain/VisitedItemRepository.mock";

describe("remove visited item use case - tests suite", () => {
  test("execute method should call the remove repository method receiving the id as a parameter", () => {
    const visitedItemRepository = new VisitedItemRepositoryMock(),
      removeItem = new RemoveVisitedItemIdUseCase(visitedItemRepository),
      id = "baa";

    removeItem.execute(id);

    expect(visitedItemRepository.remove).toBeCalledWith(id);
  });
});
