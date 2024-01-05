import { ItemRepository } from "../../domain/IItemRepository";

export class MarkItemFixedUseCase {
  constructor(private repository: ItemRepository) {}

  async execute(id: string, isFixed: boolean) {
    this.repository.update(id, { isFixed });
  }
}
