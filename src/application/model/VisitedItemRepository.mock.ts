import { IVisitedItemRespository } from "./IVisitedItemRespository";

export class VisitedItemRepositoryMock implements IVisitedItemRespository {
  exist = jest.fn();
  save = jest.fn();
  clear = jest.fn();
}
