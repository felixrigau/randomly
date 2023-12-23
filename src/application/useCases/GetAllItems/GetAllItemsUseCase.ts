import { ItemRepository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";

export class GetAllItemsUseCase {
  constructor(private repository: ItemRepository) {}

  async execute(): Promise<Item[]> {
    return this.repository.getAll();
  }
}
