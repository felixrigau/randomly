import { IVisitedItemRepository } from "../../model/IVisitedItemRepository";

export class RemoveVisitedItemIdUseCase {
  constructor(private repository: IVisitedItemRepository) {}

  execute(id: string) {
    this.repository.remove(id);
  }
}
