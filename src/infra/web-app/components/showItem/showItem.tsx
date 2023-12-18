import { useEffect, useState } from "react";
import { Item } from "../../../../application/model/Item";
import { NoMoreItemsError } from "../../../../application/useCases/GetItemRandomly/NoMoreItemsError";
import {
  StyledButton,
  StyledIconWrapper,
  StyledItem,
  StyledMessage,
  StyledText,
  StyledTitle,
} from "./showItem.styled";
import useItemCRUD from "../../hooks/useItemCRUD/useItemCRUD";
import { StyledFixedButtonContainer } from "../../shared/styles.styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ShowItem = () => {
  const [existItems, setExistItems] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      {existItems && item && hasMoreItems && (
        <>
          <StyledTitle>{item.title}</StyledTitle>
          <StyledButton onClick={() => setIsOpen(!isOpen)}>
            <StyledIconWrapper isOpen={isOpen}>
              <ExpandMoreIcon />
            </StyledIconWrapper>
            {isOpen ? "hide" : "show more"}
          </StyledButton>
          <StyledText isOpen={isOpen}>{item.text}</StyledText>
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
