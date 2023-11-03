import { IVisitedItemRepository } from "./IVisitedItemRepository";

export class VisitedItemRepositoryMock implements IVisitedItemRepository {
  exist = jest.fn();
  save = jest.fn();
  clear = jest.fn();
}
