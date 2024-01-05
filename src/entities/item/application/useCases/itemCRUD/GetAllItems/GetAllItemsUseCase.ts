import { ItemRepository } from "../../../domain/IItemRepository";
import { Item } from "../../../domain/Item";

export class GetAllItemsUseCase {
  constructor(private repository: ItemRepository) {}

  async execute(): Promise<Item[]> {
    return this.repository.getAll();
  }
}
