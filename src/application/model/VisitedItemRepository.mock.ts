import { IVisitedItemRepository } from "./IVisitedItemRepository";

export class VisitedItemRepositoryMock implements IVisitedItemRepository {
  exist = jest.fn();
  save = jest.fn();
  remove = jest.fn();
  clear = jest.fn();
  size = jest.fn();
  getLastRequestDate = jest.fn();
}
