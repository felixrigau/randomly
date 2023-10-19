import { ItemRespository } from "../../model/IItemRepository";

export class MarkItemFixedUseCase {
  constructor(private repository: ItemRespository) {}

  execute(id: string, isFixed: boolean) {
    this.repository.update(id, { isFixed });
  }
}
