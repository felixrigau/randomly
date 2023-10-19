import { RemoveItemUseCase } from "./RemoveItemUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";

describe("remove item use case - tests suite", () => {
  test("execute method should call the remove repository method receiving the id as a parameter", () => {
    const itemRespository = new ItemRepositoryMock(),
      removeItem = new RemoveItemUseCase(itemRespository),
      id = "baa";

    removeItem.execute(id);

    expect(itemRespository.remove).toBeCalledWith(id);
  });
});
