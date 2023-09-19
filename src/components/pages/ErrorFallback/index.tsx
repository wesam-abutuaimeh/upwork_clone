"use client";
import React from "react";
import { StyledError } from "./style";
import CustomAlert from "../../atoms/CustomAlert";

const ErrorFallback = ({ resetErrorBoundary }: any) => {
  return (
    <StyledError>
      <h2>Whoops! | Something went wrong</h2>
      <CustomAlert severity="error">Whoops! there was an error</CustomAlert>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </StyledError>
  );
};

export default ErrorFallback;
