import { ItemRepository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";

export class UpdateItemUseCase {
  constructor(private repository: ItemRepository) {}

  execute(id: string, newItem: Partial<Item>) {
    return this.repository.update(id, newItem);
  }
}
