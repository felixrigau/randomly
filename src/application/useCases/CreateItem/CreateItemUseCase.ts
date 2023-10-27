import { ItemRespository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";

export class CreateItemUseCase {
  constructor(private repository: ItemRespository) {}

  execute(item: Item) {
    this.repository.save(item);
  }
}