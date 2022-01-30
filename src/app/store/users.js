import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        usersRequested(state) {
            state.isLoading = true;
        },
        usersReceved(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestedField(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { actions, reducer: usersReducer } = usersSlice;
const { usersRequested, usersReceved, usersRequestedField } = actions;

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestedField(error.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

export default usersReducer;
