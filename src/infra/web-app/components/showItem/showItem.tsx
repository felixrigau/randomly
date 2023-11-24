import { useRef, useState } from "react";
import { Item } from "../../../../application/model/Item";
import { GetItemRandomlyUseCase } from "../../../../application/useCases/GetItemRandomly/GetItemRandomlyUseCase";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { VisitedItemIdStorageRepository } from "../../../adapters/VisitedItemIdStorageRepository/VisitedItemIdStorageRepository";
import { NoMoreItemsError } from "../../../../application/useCases/GetItemRandomly/NoMoreItemsError";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import { StyledItem } from "./showItem.styled";

const ShowItem = () => {
  const { existItems } = useItemsContext();
  const [item, setItem] = useState<Item>(null);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const useCases = useRef({
    getItemRandomly: new GetItemRandomlyUseCase(
      new ItemStorageRepository(),
      new VisitedItemIdStorageRepository()
    ),
  });

  const getItem = () => {
    try {
      setItem(useCases.current.getItemRandomly.execute());
    } catch (error: unknown) {
      if (error instanceof NoMoreItemsError) {
        setHasMoreItems(false);
      }
    }
  };

  return (
    <StyledItem>
      {existItems && item && hasMoreItems && <p>{item.title}</p>}
      {!hasMoreItems && <p>All items were visited today</p>}
      {!existItems && <p>All items were visited today</p>}
      <button onClick={getItem} aria-label="get next item">
        Next
      </button>
    </StyledItem>
  );
};

export default ShowItem;
