import { FindItemByIdUseCase } from "./FindItemByIdUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";
import { Item } from "../../model/Item";

describe("find item by id  use case - tests suite", () => {
  test("execute method should call the findBy repository method receiving the id as a parameter and return the found item", () => {
    const itemRespository = new ItemRepositoryMock(),
      findItemById = new FindItemByIdUseCase(itemRespository),
      id = "baa";

    const found = findItemById.execute(id);

    expect(itemRespository.findBy).toBeCalledWith(id);
    expect(found).toBeInstanceOf(Item);
  });
});
