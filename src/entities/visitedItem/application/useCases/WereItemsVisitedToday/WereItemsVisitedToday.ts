import { IVisitedItemRepository } from "../../domain/IVisitedItemRepository";

export class WereItemsVisitedToday {
  constructor(private repository: IVisitedItemRepository) {}

  async execute() {
    const lastRequestDate = await this.repository.getLastRequestDate();
    return lastRequestDate.toDateString() === new Date().toDateString();
  }
}
