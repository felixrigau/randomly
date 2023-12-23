import { IVisitedItemRepository } from "../../model/IVisitedItemRepository";

export class RemoveVisitedItemIdUseCase {
  constructor(private repository: IVisitedItemRepository) {}

  async execute(id: string) {
    this.repository.remove(id);
  }
}
