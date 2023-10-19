import { ItemRespository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";

export class GetAllItemsUseCase {
  constructor(private repository: ItemRespository) {}

  execute(): Item[] {
    return this.repository.getAll();
  }
}
