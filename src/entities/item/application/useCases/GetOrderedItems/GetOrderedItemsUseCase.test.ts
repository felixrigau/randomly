import { GetOrderedItemsUseCase } from "./GetOrderedItemsUseCase";
import { ItemRepositoryMock } from "../../domain/ItemRepository.mock";
import { Item } from "../../domain/Item";

describe("get all items use case - tests suite", () => {
  test("execute method should call the getAll repository method and return ordered fixed items first and then the no fixed ones ", async () => {
    const itemRepository = new ItemRepositoryMock();
    const FIXED = true,
      NO_FIXED = false;

    itemRepository.getAll.mockImplementation(async () => [
      new Item("john", "", NO_FIXED),
      new Item("peter", "", FIXED, 2),
      new Item("alice", "", FIXED, 1),
    ]);
    const getAllItems = new GetOrderedItemsUseCase(itemRepository);

    const itemList = await getAllItems.execute();

    expect(itemList[0].title).toBe("alice");
    expect(itemList[1].title).toBe("peter");
    expect(itemList[2].title).toBe("john");
  });
});
