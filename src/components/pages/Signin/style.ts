import styled from "styled-components";

export const StyledSignIn = styled.div`
  .login_with_exist_account {
    margin: 0 auto;
    display: block;
    text-align: center;
    margin-top: 20px;
    a {
      text-decoration: none;
      margin-left: 5px;
      color: #319325;
    }
  }
  .signup_form {
    width: "100%";
  }
  .line {
    position: relative;
    text-align: center;
    &::before {
      position: absolute;
      content: "";
      left: 0;
      top: 50%;
      width: 80px;
      height: 1px;
      background-color: #8f8e8e;
      transform: translateY(-50%);
    }
    &::after {
      position: absolute;
      content: "";
      right: 0;
      top: 50%;
      width: 80px;
      height: 1px;
      background-color: #8f8e8e;
      transform: translateY(-50%);
    }
  }
  .go_to_signup a {
    text-decoration: none;
    color: #108a00;
    text-transform: capitalize;
  }
`;
