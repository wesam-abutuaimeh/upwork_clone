"use client";
import React from "react";

// MUI
import { Container } from "@mui/material";

// Custom Components
import CustomLink from "../atoms/CustomLink";

// Style
import { StyledFooter } from "./style";

const AuthFooter = () => {
  return (
    <Container>
      <StyledFooter>
        <small>
          © 2015 - 2023 Upwork® Global Inc. •{" "}
          <CustomLink href="/">Privacy Policy</CustomLink>
        </small>
      </StyledFooter>
    </Container>
  );
};

export default AuthFooter;
