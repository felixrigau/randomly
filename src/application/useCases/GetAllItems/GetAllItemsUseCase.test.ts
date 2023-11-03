import { GetAllItemsUseCase } from "./GetAllItemsUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";
import { Item } from "../../model/Item";

describe("get all items use case - tests suite", () => {
  test("execute method should call the getAll repository method and return all items", () => {
    const itemRepository = new ItemRepositoryMock(),
      getAllItems = new GetAllItemsUseCase(itemRepository);

    const itemList = getAllItems.execute();

    expect(itemRepository.getAll).toBeCalled();
    expect(itemList[0]).toBeInstanceOf(Item);
  });
});
