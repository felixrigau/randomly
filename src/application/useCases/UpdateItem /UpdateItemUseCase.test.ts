import { UpdateItemUseCase } from "./UpdateItemUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";

describe("update item use case - tests suite", () => {
  test("execute method should call the update repository method receiving the id and the new item as parameters", () => {
    const itemRespository = new ItemRepositoryMock(),
      updateItem = new UpdateItemUseCase(itemRespository),
      id = "baa",
      newItem = { title: "baa" };

    updateItem.execute(id, newItem);

    expect(itemRespository.update).toBeCalledWith(id, newItem);
  });
});
