import { FindItemByIdUseCase } from "./FindItemByIdUseCase";
import { ItemRepositoryMock } from "../../../domain/ItemRepository.mock";
import { Item } from "../../../domain/Item";

describe("find item by id  use case - tests suite", () => {
  test("execute method should call the findBy repository method receiving the id as a parameter and return the found item", async () => {
    const itemRepository = new ItemRepositoryMock(),
      findItemById = new FindItemByIdUseCase(itemRepository),
      id = "baa";

    const foundItem = await findItemById.execute(id);

    expect(itemRepository.findBy).toBeCalledWith(id);
    expect(foundItem).toBeInstanceOf(Item);
  });
});
