import { GetAllItemsUseCase } from "./GetAllItemsUseCase";
import { ItemRepositoryMock } from "../../../domain/ItemRepository.mock";
import { Item } from "../../../domain/Item";

describe("get all items use case - tests suite", () => {
  test("execute method should call the getAll repository method and return all items", async () => {
    const itemRepository = new ItemRepositoryMock(),
      getAllItems = new GetAllItemsUseCase(itemRepository);

    const itemList = await getAllItems.execute();

    expect(itemRepository.getAll).toBeCalled();
    expect(itemList[0]).toBeInstanceOf(Item);
  });
});
