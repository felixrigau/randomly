import { ItemRepository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";

export class CreateItemUseCase {
  constructor(private repository: ItemRepository) {}

  async execute(item: Item) {
    this.repository.save(item);
  }
}
