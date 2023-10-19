import { GetAllItemsUseCase } from "./GetAllItemsUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";
import { Item } from "../../model/Item";

describe("get all items use case - tests suite", () => {
  test("execute method should call the getAll repository method and return all items", () => {
    const itemRespository = new ItemRepositoryMock(),
      getAllItems = new GetAllItemsUseCase(itemRespository);

    const itemList = getAllItems.execute();

    expect(itemRespository.getAll).toBeCalled();
    expect(itemList[0]).toBeInstanceOf(Item);
  });
});
