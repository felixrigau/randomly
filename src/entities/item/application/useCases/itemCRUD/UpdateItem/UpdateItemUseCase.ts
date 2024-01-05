import { ItemRepository } from "../../../domain/IItemRepository";
import { Item } from "../../../domain/Item";

export class UpdateItemUseCase {
  constructor(private repository: ItemRepository) {}

  async execute(id: string, newItem: Partial<Item>) {
    return this.repository.update(id, newItem);
  }
}
