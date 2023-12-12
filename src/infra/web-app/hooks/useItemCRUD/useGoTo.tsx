import { useNavigate } from "react-router-dom";

export const useGoTo = () => {
  const navigate = useNavigate();

  return {
    goToHome: () => navigate("/"),
    goToItems: () => navigate("/items"),
  };
};
