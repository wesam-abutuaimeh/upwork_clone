import { useReducer } from "react";
import axios from "axios";
import { ROLES } from "../constants/roles";
import { AUTH_API_URL } from "../config/api";

const AUTH_ACTIONS = {
  AUTHENTICATE: "AUTHENTICATE",
  LOGOUT: "LOGOUT",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  ALERT: "showAuthAlert",
};

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || null;
  }
  return null;
};

const getRole = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("role") || ROLES.GUEST;
  }
  return null;
};

const INIT_STATE = {
  user: null,
  isAuth: false,
  token: getToken(), // Use the getToken function to get the token
  role: getRole(),
  error: null,
  isLoading: false,
  showAuthAlert: false,
};

const authReducer = (state: any, action: any) => {
  const checkRole = () => (action.payload.isAdmin ? ROLES.ADMIN : ROLES.USER);
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, isLoading: true };
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case AUTH_ACTIONS.AUTHENTICATE:
      const token = action.payload.token || state.token || getToken(); // Use the getToken function here
      const role = checkRole();
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);

      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
        token: token,
        role: role,
        isLoading: false,
      };
    case AUTH_ACTIONS.ALERT:
      return { ...state, showAuthAlert: true };
    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      return {
        user: null,
        isAuth: false,
        token: null, // Reset the token to null
        role: getRole(),
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, INIT_STATE);

  const handleAUTHENTICATE = async (endPoint: any, body: any) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING });
      const { data } = await axios.post(AUTH_API_URL + endPoint, body);
      dispatch({ type: AUTH_ACTIONS.AUTHENTICATE, payload: data });
    } catch (error: any) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const logout = () => dispatch({ type: AUTH_ACTIONS.LOGOUT });

  return { ...state, handleAUTHENTICATE, logout };
};

export default useAuth;
