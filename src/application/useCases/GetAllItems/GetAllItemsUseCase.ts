import { ItemRespository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";

export class GetAllItemsUseCase {
  protected repository: ItemRespository;

  constructor(respository: ItemRespository) {
    this.repository = respository;
  }

  execute(): Item[] {
    return this.repository.getAll();
  }
}
