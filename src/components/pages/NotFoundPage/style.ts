import styled from "styled-components";

export const StyledNotFoundPage = styled.div`
  color: #14a800;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font: 30px bold;

  a {
    margin-top: 20px;
    padding: 15px;
    color: #14a800;
    border: 2px solid #14a800;
    border-radius: 11px;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;

    &:hover {
      background-color: #f7faf7;
    }
  }
`;
