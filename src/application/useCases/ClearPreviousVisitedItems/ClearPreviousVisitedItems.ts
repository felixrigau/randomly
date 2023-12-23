import { IVisitedItemRepository } from "../../model/IVisitedItemRepository";

export class ClearPreviousVisitedItems {
  constructor(private repository: IVisitedItemRepository) {}

  async execute() {
    this.repository.clear();
  }
}
