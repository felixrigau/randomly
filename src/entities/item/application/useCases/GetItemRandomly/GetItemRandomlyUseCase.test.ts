import { GetItemRandomlyUseCase } from "./GetItemRandomlyUseCase";
import { ItemRepositoryMock } from "../../domain/ItemRepository.mock";
import { VisitedItemRepositoryMock } from "../../../../visitedItem/application/domain/VisitedItemRepository.mock";
import { ItemRepository } from "../../domain/IItemRepository";
import { Item } from "../../domain/Item";
import { IVisitedItemRepository } from "../../../../visitedItem/application/domain/IVisitedItemRepository";
import { NoMoreItemsError } from "./NoMoreItemsError";

describe("get item randomly use case - tests suite", () => {
  const itemRepository: jest.Mocked<ItemRepository> = new ItemRepositoryMock(),
    visitedItemRepository: jest.Mocked<IVisitedItemRepository> =
      new VisitedItemRepositoryMock();

  test("execute method should return null if there are not element to return", async () => {
    itemRepository.getAll.mockImplementation(async () => []);

    const getItemRandomly = new GetItemRandomlyUseCase(
      itemRepository,
      visitedItemRepository
    );

    const result = await getItemRandomly.execute();

    expect(result).toBe(null);
  });

  test("execute method should return a random item that has not been visited yet", async () => {
    const item1 = new Item("abc"),
      visitedItem = new Item("foo");

    itemRepository.getAll.mockImplementation(async () => [item1, visitedItem]);

    visitedItemRepository.exist.mockImplementation(async (id: string) => {
      return id === visitedItem.id;
    });

    const getItemRandomly = new GetItemRandomlyUseCase(
      itemRepository,
      visitedItemRepository
    );

    const randomItem = await getItemRandomly.execute();

    expect(randomItem.id).toBe(item1.id);
  });

  test("execute method should try one or many times to get a random item until finding a no visited one", async () => {
    const visitedItem = new Item("abc"),
      item = new Item("123");
    itemRepository.getAll.mockImplementation(async () => [
      item,
      visitedItem,
      visitedItem,
      visitedItem,
      visitedItem,
      visitedItem,
    ]);

    visitedItemRepository.exist.mockImplementation(async (id: string) => {
      return id === visitedItem.id;
    });

    const getItemRandomly = new GetItemRandomlyUseCase(
      itemRepository,
      visitedItemRepository
    );

    const randomItem = await getItemRandomly.execute();

    expect(randomItem.id).toBe(item.id);
    expect(visitedItemRepository.exist.mock.calls.length).toBeGreaterThan(0);
  });

  test("execute method should save the item id as visited", async () => {
    const item = new Item("123");
    itemRepository.getAll.mockImplementation(async () => [item]);

    visitedItemRepository.exist.mockImplementation(async () => false);

    const getItemRandomly = new GetItemRandomlyUseCase(
      itemRepository,
      visitedItemRepository
    );

    const randomItem = await getItemRandomly.execute();

    expect(randomItem.id).toBe(item.id);
    expect(visitedItemRepository.save).toBeCalledWith(item.id);
  });

  test("execute method should throw a NoMoreItemsError error if all items are visited", () => {
    const visitedItem1 = new Item("abc"),
      visitedItem2 = new Item("123");
    const items = [visitedItem1, visitedItem2];

    itemRepository.getAll.mockImplementation(async () => [
      visitedItem1,
      visitedItem2,
    ]);

    visitedItemRepository.size.mockImplementation(async () => items.length);

    const getItemRandomly = new GetItemRandomlyUseCase(
      itemRepository,
      visitedItemRepository
    );

    getItemRandomly.execute().catch((error) => {
      expect(error).toBeInstanceOf(NoMoreItemsError);
    });
  });
});
