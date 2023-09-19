import React from "react";
import { SessionProvider } from "next-auth/react";
interface IProps {
  children: React.ReactNode;
}

const Provider: React.FC<IProps> = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);

export default Provider;
