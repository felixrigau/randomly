import { ItemRepository } from "./IItemRepository";
import { Item } from "./Item";

export class ItemRepositoryMock implements ItemRepository {
  save = jest.fn();
  remove = jest.fn();
  getAll = jest.fn().mockImplementation(() => [new Item("foo")]);
  findBy = jest.fn().mockImplementation(() => new Item("foo"));
  update = jest.fn();
}
