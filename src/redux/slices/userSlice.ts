import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config/api";
import { END_POINTS } from "@/constants/endPoints";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  user: null,
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, { payload = true }) => {
      state.isLoading = payload;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    get: (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    },
    edit: (state, action) => {
      return {
        ...state,
        users: users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        isLoading: false,
        error: null,
      };
    },
  },
});

const { setLoading, setError, get, edit } = users.actions;

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`${API_URL}${END_POINTS.USERS}/${id}`);
    dispatch(get(data));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const editUser = (data) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await axios.put(`${API_URL}${END_POINTS.USERS}/`, data);
    dispatch(edit(data));
  } catch (error) {
    dispatch(setError(error));
  }
};

export default users.reducer;
