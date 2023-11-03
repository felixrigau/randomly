import { ItemRepository } from "../../model/IItemRepository";

export class FindItemByIdUseCase {
  constructor(private repository: ItemRepository) {}

  execute(id: string) {
    return this.repository.findBy(id);
  }
}
