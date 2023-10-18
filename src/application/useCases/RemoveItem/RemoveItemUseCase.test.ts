import { RemoveItemUseCase } from "./RemoveItemUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";

describe("remove item use case - tests suite", () => {
  test("the class should build a instance with a execute method", () => {
    const removeItem = new RemoveItemUseCase(new ItemRepositoryMock());

    expect(removeItem.execute).toBeDefined();
  });

  test("execute method should call the remove repository method receiving the id as a parameter", () => {
    const itemRespository = new ItemRepositoryMock(),
      removeItem = new RemoveItemUseCase(itemRespository),
      id = "baa";

    removeItem.execute(id);

    expect(itemRespository.remove).toBeCalledWith(id);
  });
});
