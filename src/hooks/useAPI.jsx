import { useReducer } from 'react';
import axios from 'axios';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
};

const ACTION_TYPES = {
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESSFUL: 'FETCH_SUCCESSFUL',
    FETCH_ERROR: 'FETCH_ERROR',
    DELETE: 'DELETE',
    POST: 'POST',
    PUT: 'PUT',
};

const apiReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_START:
            return { ...state, isLoading: true };
        case ACTION_TYPES.FETCH_SUCCESSFUL:
            return { ...state, data: action.payload, isLoading: false };
        case ACTION_TYPES.FETCH_ERROR:
            return { ...state, isLoading: false, error: action.payload };
        case ACTION_TYPES.DELETE:
            return {
                ...state,
                data: {
                    ...state.data,
                    users: state.data.users.filter((user) => user._id !== action.payload),
                },
                isLoading: false,
            };
        case ACTION_TYPES.POST:
            return {
                ...state,
                data: {
                    ...state.data,
                    users: [...state.data.users, action.payload],
                },
                isLoading: false,
            };
        case ACTION_TYPES.PUT:
            return { ...state, data: action.payload };
        default:
            throw new Error(`Action Type Error! ${action.type}`);
    }
};

const useAPI = (API_URL) => {
    const [state, dispatch] = useReducer(apiReducer, initialState);

    const get = async (config) => {
        try {
            dispatch({ type: ACTION_TYPES.FETCH_START });
            const response = await axios.get(API_URL, config);
            dispatch({
                type: ACTION_TYPES.FETCH_SUCCESSFUL,
                payload: response.data.data || response.data,
            });
        } catch (error) {
            dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
        }
    };

    const getQuery = async (value, config) => {
        try {
            dispatch({ type: ACTION_TYPES.FETCH_START });
            const response = await axios.get(`${API_URL}?q=${value}`, config);
            dispatch({
                type: ACTION_TYPES.FETCH_SUCCESSFUL,
                payload: response.data.data || response.data,
            });
        } catch (error) {
            dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
        }
    };

    const deleteItem = async (id, config) => {
        try {
            await axios.delete(`${API_URL}/${id}`, config);
            dispatch({ type: ACTION_TYPES.DELETE, payload: id });
        } catch (error) {
            dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
        }
    };

    const post = async (body) => {
        try {
            dispatch({ type: ACTION_TYPES.FETCH_START });

            const response = await axios.post(API_URL, body);
            dispatch({ type: ACTION_TYPES.POST, payload: response.data.data });
        } catch (error) {
            dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
        }
    };

    const put = async (url, data) => {
        try {
            const response = await axios.put(url, data);
            dispatch({ type: ACTION_TYPES.PUT, payload: response.data });
        } catch (error) {
            dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
        }
    };

    return {
        ...state,
        get,
        getQuery,
        deleteItem,
        post,
        put,
    };
};

export default useAPI;
