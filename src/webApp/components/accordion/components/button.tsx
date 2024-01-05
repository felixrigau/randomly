import { StyledButton, StyledIconWrapper } from "../accordion.styled";
import { useAccordionContext } from "../context/useAccordionContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Button = () => {
  const { isOpen, setIsOpen } = useAccordionContext();
  return (
    <StyledButton onClick={() => setIsOpen(!isOpen)}>
      <StyledIconWrapper isOpen={isOpen}>
        <ExpandMoreIcon />
      </StyledIconWrapper>
      {isOpen ? "hide" : "show more"}
    </StyledButton>
  );
};
