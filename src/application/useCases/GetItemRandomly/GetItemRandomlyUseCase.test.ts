import { GetItemRandomlyUseCase } from "./GetItemRandomlyUseCase";
import { ItemRepositoryMock } from "../../model/ItemRepository.mock";
import { VisitedItemRepositoryMock } from "../../model/VisitedItemRepository.mock";
import { ItemRepository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";
import { IVisitedItemRepository } from "../../model/IVisitedItemRepository";

describe("get all items use case - tests suite", () => {
  const itemRepository: jest.Mocked<ItemRepository> = new ItemRepositoryMock(),
    visitedItemRepository: jest.Mocked<IVisitedItemRepository> =
      new VisitedItemRepositoryMock();

  test("execute method should return null if there are not element to return", () => {
    itemRepository.getAll.mockImplementation(() => []);

    const getItemRandomly = new GetItemRandomlyUseCase(
      itemRepository,
      visitedItemRepository
    );

    expect(getItemRandomly.execute()).toBe(null);
  });

  test("execute method should return a random item that has not been visited yet", () => {
    const item1 = new Item("abc"),
      visitedItem = new Item("foo");

    itemRepository.getAll.mockImplementation(() => [item1, visitedItem]);

    visitedItemRepository.exist.mockImplementation((id: string) => {
      return id === visitedItem.id;
    });

    const getItemRandomly = new GetItemRandomlyUseCase(
      itemRepository,
      visitedItemRepository
    );

    expect(getItemRandomly.execute().id).toBe(item1.id);
  });

  test("execute method should try many times to get a random item until finding a no visited one", () => {
    const visitedItem = new Item("abc"),
      item = new Item("123");
    itemRepository.getAll.mockImplementation(() => [
      item,
      visitedItem,
      visitedItem,
      visitedItem,
      visitedItem,
      visitedItem,
    ]);

    visitedItemRepository.exist.mockImplementation((id: string) => {
      return id === visitedItem.id;
    });

    const getItemRandomly = new GetItemRandomlyUseCase(
      itemRepository,
      visitedItemRepository
    );

    const randomItem = getItemRandomly.execute();

    expect(randomItem.id).toBe(item.id);
    expect(visitedItemRepository.exist.mock.calls.length).toBeGreaterThan(1);
  });
});
