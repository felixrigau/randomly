import { IVisitedItemRepository } from "../../model/IVisitedItemRepository";

export class CheckLastVisitedItemsDate {
  constructor(private repository: IVisitedItemRepository) {}

  execute(): boolean {
    return (
      this.repository.getLastDate().toDateString() === new Date().toDateString()
    );
  }
}
