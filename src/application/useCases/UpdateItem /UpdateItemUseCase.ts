import { ItemRespository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";

export class UpdateItemUseCase {
  constructor(private repository: ItemRespository) {}

  execute(id: string, newItem: Partial<Item>) {
    return this.repository.update(id, newItem);
  }
}
