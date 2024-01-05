import { ItemRepository } from "../../../domain/IItemRepository";

export class FindItemByIdUseCase {
  constructor(private repository: ItemRepository) {}

  async execute(id: string) {
    return this.repository.findBy(id);
  }
}
