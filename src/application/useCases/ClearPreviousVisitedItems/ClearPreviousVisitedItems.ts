import { IVisitedItemRepository } from "../../model/IVisitedItemRepository";

export class ClearPreviousVisitedItems {
  constructor(private repository: IVisitedItemRepository) {}

  execute(): void {
    this.repository.clear();
  }
}
