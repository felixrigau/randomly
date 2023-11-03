import { ItemRepository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";

export class GetAllItemsUseCase {
  constructor(private repository: ItemRepository) {}

  execute(): Item[] {
    return this.repository.getAll();
  }
}
