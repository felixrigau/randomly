import { ItemRepository } from "../../model/IItemRepository";
import { GetAllItemsUseCase } from "../GetAllItems/GetAllItemsUseCase";

export class ChangeFiexdItemOrderUseCase {
  constructor(private repository: ItemRepository) {}

  execute(): void {
    const getAllItems = new GetAllItemsUseCase(this.repository);
    console.log(getAllItems.execute());
  }
}
