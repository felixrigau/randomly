import { CreateItemUseCase } from "./CreateItemUseCase";
import { ItemRepositoryMock } from "../../../model/ItemRepository.mock";
import { Item } from "../../../model/Item";

describe("create item use case - tests suite", () => {
  test("execute method should call the save repository method receiving the item as a parameter", () => {
    const itemRepository = new ItemRepositoryMock(),
      createItem = new CreateItemUseCase(itemRepository),
      item = new Item("foo");

    createItem.execute(item);

    expect(itemRepository.save).toBeCalledWith(item);
  });
});
