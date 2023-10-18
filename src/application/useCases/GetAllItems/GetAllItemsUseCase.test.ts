import { GetAllItemsUseCase } from "./GetAllItemsUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";
import { Item } from "../../model/Item";

describe("get all items use case - tests suite", () => {
  test("the class should build a instance with a execute method", () => {
    const getAllItems = new GetAllItemsUseCase(new ItemRepositoryMock());

    expect(getAllItems.execute).toBeDefined();
  });

  test("execute method should call the getAll repository method and return all items", () => {
    const itemRespository = new ItemRepositoryMock(),
      getAllItems = new GetAllItemsUseCase(itemRespository);

    const itemList = getAllItems.execute();

    expect(itemRespository.getAll).toBeCalled();
    expect(itemList[0]).toBeInstanceOf(Item);
  });
});
