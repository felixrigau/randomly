import { ItemRespository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";

export class CreateItemUseCase {
  protected repository: ItemRespository;

  constructor(respository: ItemRespository) {
    this.repository = respository;
  }

  execute(item: Item) {
    this.repository.save(item);
  }
}
