"use client";

import React, { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

export const RoleContext = createContext<null>(null);
export const useAuthContext = () => useContext(RoleContext);

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext: React.FC<AuthContextProps> = ({ children }) => {
  const data = useAuth();
  return <RoleContext.Provider value={data}>{children}</RoleContext.Provider>;
};

export default AuthContext;
