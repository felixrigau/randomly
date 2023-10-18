import { ItemRespository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";

export class UpdateItemUseCase {
  protected repository: ItemRespository;

  constructor(respository: ItemRespository) {
    this.repository = respository;
  }

  execute(id: string, newItem: Partial<Item>) {
    return this.repository.update(id, newItem);
  }
}
