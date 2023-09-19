import styled from "styled-components";

export const StyledFavoriteButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: #188d08;
  border: 2px solid #dae3da;
  border-radius: 50%;
  z-index: 10;
`;

export const MODALSTYLE = {
  position: "absolute" as "absolute",
  top: "0",
  right: "-2%",
  width: 600,
  height: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
};
