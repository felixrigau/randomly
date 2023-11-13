import { IVisitedItemRepository } from "../../model/IVisitedItemRepository";

export class WereItemsVisitedToday {
  constructor(private repository: IVisitedItemRepository) {}

  execute(): boolean {
    return (
      this.repository.getLastRequestDate().toDateString() ===
      new Date().toDateString()
    );
  }
}
