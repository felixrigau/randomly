import { IVisitedItemRepository } from "../../model/IVisitedItemRepository";

export class SaveLastVisitDate {
  constructor(private repository: IVisitedItemRepository) {}

  async execute(currentDate: Date) {
    this.repository.saveLastRequestDate(currentDate);
  }
}
