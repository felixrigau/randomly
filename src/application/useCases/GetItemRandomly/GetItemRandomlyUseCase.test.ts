import { GetItemRandomlyUseCase } from "./GetItemRandomlyUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";
import { VisitedItemRepositoryMock } from "../../model/VisitedItemRepository.mock";
import { ItemRespository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";
import { IVisitedItemRespository } from "../../model/IVisitedItemRespository";

describe("get all items use case - tests suite", () => {
  const itemRespository: jest.Mocked<ItemRespository> =
      new ItemRepositoryMock(),
    visitedItemRespository: jest.Mocked<IVisitedItemRespository> =
      new VisitedItemRepositoryMock();

  test("execute method should throw a error if there are not element to return", () => {
    itemRespository.getAll.mockImplementation(() => []);

    const getItemRandomly = new GetItemRandomlyUseCase(
      itemRespository,
      visitedItemRespository
    );

    expect(() => getItemRandomly.execute()).toThrow("There is no items");
  });

  test("execute method should return a random item that has not been visited yet", () => {
    const item1 = new Item("abc"),
      visitedItem = new Item("foo");

    itemRespository.getAll.mockImplementation(() => [item1, visitedItem]);

    visitedItemRespository.exist.mockImplementation((id: string) => {
      return id === visitedItem.id;
    });

    const getItemRandomly = new GetItemRandomlyUseCase(
      itemRespository,
      visitedItemRespository
    );

    expect(getItemRandomly.execute().id).toBe(item1.id);
  });

  test.skip("execute method should try many times to get a random item until finding a no visited one", () => {
    expect(true).toBe(false);
  });

  // test("execute method should ", () => {
  //   expect(true).toBe(false);
  // });
});
