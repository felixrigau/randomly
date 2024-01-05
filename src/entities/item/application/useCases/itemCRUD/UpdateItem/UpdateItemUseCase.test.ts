import { UpdateItemUseCase } from "./UpdateItemUseCase";
import { ItemRepositoryMock } from "../../../domain/ItemRepository.mock";

describe("update item use case - tests suite", () => {
  test("execute method should call the update repository method receiving the id and the new item as parameters", () => {
    const itemRepository = new ItemRepositoryMock(),
      updateItem = new UpdateItemUseCase(itemRepository),
      id = "baa",
      newItem = { title: "baa" };

    updateItem.execute(id, newItem);

    expect(itemRepository.update).toBeCalledWith(id, newItem);
  });
});
