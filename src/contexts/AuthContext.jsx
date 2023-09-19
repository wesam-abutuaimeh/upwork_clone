// interface ChildrenProp {
//   children: React.ReactNode;
// }

"use client";
import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth"

export const RoleContext = createContext(null);
export const useAuthContext = () => useContext(RoleContext);

const AuthContext = ({ children }) => {
  const data = useAuth();
  return <RoleContext.Provider value={data}>
    {children}
  </RoleContext.Provider>
}

export default AuthContext;
