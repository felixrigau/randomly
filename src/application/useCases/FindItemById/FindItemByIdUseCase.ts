import { ItemRespository } from "../../model/IItemRepository";

export class FindItemByIdUseCase {
  protected repository: ItemRespository;

  constructor(respository: ItemRespository) {
    this.repository = respository;
  }

  execute(id: string) {
    return this.repository.findBy(id);
  }
}
