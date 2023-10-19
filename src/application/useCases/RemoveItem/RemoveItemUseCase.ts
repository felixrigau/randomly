import { ItemRespository } from "../../model/IItemRepository";

export class RemoveItemUseCase {
  constructor(private repository: ItemRespository) {}

  execute(id: string) {
    this.repository.remove(id);
  }
}
