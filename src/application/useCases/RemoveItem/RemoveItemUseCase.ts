import { ItemRepository } from "../../model/IItemRepository";

export class RemoveItemUseCase {
  constructor(private repository: ItemRepository) {}

  execute(id: string) {
    this.repository.remove(id);
  }
}
