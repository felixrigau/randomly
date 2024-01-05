import { IVisitedItemRepository } from "../../domain/IVisitedItemRepository";

export class SaveLastVisitDate {
  constructor(private repository: IVisitedItemRepository) {}

  async execute(currentDate: Date) {
    this.repository.saveLastRequestDate(currentDate);
  }
}
