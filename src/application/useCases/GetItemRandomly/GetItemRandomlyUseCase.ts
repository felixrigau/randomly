import { ItemRespository } from "../../model/IItemRepository";
import { IVisitedItemRespository } from "../../model/IVisitedItemRespository";
import { Item } from "../../model/Item";
import { getBoundedRandomNumber } from "../../utilities/getBoundedRandomNumber";

export class GetItemRandomlyUseCase {
  constructor(
    private itemRepository: ItemRespository,
    private visitedItemRespository: IVisitedItemRespository
  ) {}

  execute(): Item {
    const items = this.itemRepository.getAll();

    if (!items.length) throw new Error("There is no items");

    let randomIndex;

    do {
      randomIndex = getBoundedRandomNumber(0, items.length);
    } while (this.visitedItemRespository.exist(items[randomIndex].id));

    return items[randomIndex];
  }
}
