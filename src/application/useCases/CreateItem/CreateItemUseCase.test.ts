import { CreateItemUseCase } from "./CreateItemUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";
import { Item } from "../../model/Item";

describe("create item use case - tests suite", () => {
  test("the class should build a instance with a execute method", () => {
    const createItem = new CreateItemUseCase(new ItemRepositoryMock());

    expect(createItem.execute).toBeDefined();
  });

  test("execute method should call the save repository method receiving the item as a parameter", () => {
    const itemRespository = new ItemRepositoryMock(),
      createItem = new CreateItemUseCase(itemRespository),
      item = new Item("foo");

    createItem.execute(item);

    expect(itemRespository.save).toBeCalledWith(item);
  });
});
