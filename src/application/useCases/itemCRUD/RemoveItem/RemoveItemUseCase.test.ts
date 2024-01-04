import { RemoveItemUseCase } from "./RemoveItemUseCase";
import { ItemRepositoryMock } from "../../../model/ItemRepository.mock";

describe("remove item use case - tests suite", () => {
  test("execute method should call the remove repository method receiving the id as a parameter", () => {
    const itemRepository = new ItemRepositoryMock(),
      removeItem = new RemoveItemUseCase(itemRepository),
      id = "baa";

    removeItem.execute(id);

    expect(itemRepository.remove).toBeCalledWith(id);
  });
});
