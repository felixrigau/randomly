import { ItemRespository } from "../../model/IItemRepository";

export class FindItemByIdUseCase {
  constructor(private repository: ItemRespository) {}

  execute(id: string) {
    return this.repository.findBy(id);
  }
}
