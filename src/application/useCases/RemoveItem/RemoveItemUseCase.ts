import { ItemRespository } from "../../model/IItemRepository";

export class RemoveItemUseCase {
  protected repository: ItemRespository;

  constructor(respository: ItemRespository) {
    this.repository = respository;
  }

  execute(id: string) {
    this.repository.remove(id);
  }
}
