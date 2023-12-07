import { useEffect, useState } from "react";
import { Item } from "../../../../application/model/Item";
import { NoMoreItemsError } from "../../../../application/useCases/GetItemRandomly/NoMoreItemsError";
import { StyledItem, Title } from "./showItem.styled";
import useItemCRUD from "../../hooks/useItemCRUD/useItemCRUD";
import { StyledButtonContainer } from "../../pages/shared/styles.styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ShowItem = () => {
  const [existItems, setExistItems] = useState<boolean>(false);
  const [item, setItem] = useState<Item>(null);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const { getAll, getRandom } = useItemCRUD();

  useEffect(() => {
    const exist = getAll().length !== 0;
    setExistItems(exist);
  }, []);

  const getItem = () => {
    try {
      setItem(getRandom());
    } catch (error: unknown) {
      if (error instanceof NoMoreItemsError) {
        setHasMoreItems(false);
      }
    }
  };

  return (
    <StyledItem>
      <div></div>
      {existItems && item && hasMoreItems && <Title>{item.title}</Title>}
      {!hasMoreItems && <p>All items were visited today</p>}
      {!existItems && <p>Create at least one item, please</p>}
      {existItems && (
        <StyledButtonContainer>
          <button onClick={getItem} aria-label="get next item">
            <ArrowForwardIosIcon />
          </button>
        </StyledButtonContainer>
      )}
    </StyledItem>
  );
};

export default ShowItem;
