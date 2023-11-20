import { IVisitedItemRepository } from "../../model/IVisitedItemRepository";

export class SaveLastVisitDate {
  constructor(private repository: IVisitedItemRepository) {}

  execute(currentDate: Date) {
    this.repository.saveLastRequestDate(currentDate);
  }
}
