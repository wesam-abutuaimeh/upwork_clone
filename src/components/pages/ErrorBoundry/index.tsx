"use client";

interface IProps {
  children: React.ReactNode;
  hasError: boolean;
  errorInfo: string;
}

import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorFallback from "@/components/pages/ErrorFallback";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    this.state.hasError && <ErrorFallback />;
    return this.props.children;
  }
}

export default ErrorBoundary;
