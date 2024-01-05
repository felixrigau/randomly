import { ItemRepository } from "../../../domain/IItemRepository";
import { Item } from "../../../domain/Item";

export class CreateItemUseCase {
  constructor(private repository: ItemRepository) {}

  async execute(item: Item) {
    this.repository.save(item);
  }
}
