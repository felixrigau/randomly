import { ItemRepository } from "../../../model/IItemRepository";

export class RemoveItemUseCase {
  constructor(private repository: ItemRepository) {}

  async execute(id: string) {
    this.repository.remove(id);
  }
}
