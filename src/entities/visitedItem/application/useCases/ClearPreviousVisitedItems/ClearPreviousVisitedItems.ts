import { IVisitedItemRepository } from "../../domain/IVisitedItemRepository";

export class ClearPreviousVisitedItems {
  constructor(private repository: IVisitedItemRepository) {}

  async execute() {
    this.repository.clear();
  }
}
