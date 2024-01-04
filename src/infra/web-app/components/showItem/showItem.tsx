import { useEffect, useState } from "react";
import { Item } from "../../../../application/model/Item";
import { NoMoreItemsError } from "../../../../application/useCases/GetItemRandomly/NoMoreItemsError";
import { StyledItem, StyledMessage, StyledTitle } from "./showItem.styled";
import useItemCRUD from "../../hooks/useItemCRUD/useItemCRUD";
import { StyledFixedButtonContainer } from "../../shared/styles.styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Accordion } from "../accordion/accordion";

const ShowItem = () => {
  const [existItems, setExistItems] = useState<boolean>(false);
  const [item, setItem] = useState<Item>(null);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const { getAll, getRandom } = useItemCRUD();

  useEffect(() => {
    getAll().then((items) => {
      const exist = items.length !== 0;
      setExistItems(exist);
    });
  }, []);

  const getItem = async () => {
    try {
      setItem(null);
      const randomItem = await getRandom();
      setItem(randomItem);
    } catch (error: unknown) {
      if (error instanceof NoMoreItemsError) {
        setHasMoreItems(false);
      }
    }
  };

  return (
    <StyledItem>
      <div></div>
      {existItems && item && hasMoreItems && (
        <>
          <StyledTitle>{item.title}</StyledTitle>
          {item.text && (
            <Accordion>
              <Accordion.Button />
              <Accordion.Content>{item.text}</Accordion.Content>
            </Accordion>
          )}
        </>
      )}
      {!hasMoreItems && (
        <StyledMessage>All items were visited today</StyledMessage>
      )}
      {!existItems && (
        <StyledMessage>Create at least one item, please</StyledMessage>
      )}
      {existItems && (
        <StyledFixedButtonContainer>
          <button onClick={getItem} aria-label="get next item">
            <ArrowForwardIosIcon />
          </button>
        </StyledFixedButtonContainer>
      )}
    </StyledItem>
  );
};

export default ShowItem;
