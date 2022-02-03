import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested(state) {
            state.isLoading = true;
        },
        commentsReceved(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestedField(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsCreateRequested(state) {
            state.isLoading = true;
        },
        commentsCreated(state, action) {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        commentsCreateField(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsRemoveRequested(state) {
            state.isLoading = true;
        },
        commentsRemoved(state, action) {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
            state.isLoading = false;
        },
        commentsRemoveRequestedField(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestedField,
    commentsCreateRequested,
    commentsCreated,
    commentsCreateField,
    commentsRemoveRequested,
    commentsRemoved,
    commentsRemoveRequestedField
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestedField(error.message));
    }
};

export const createComment =
    (data, userId, currentUserId) => async (dispatch) => {
        dispatch(commentsCreateRequested());
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            _id: nanoid(),
            userId: currentUserId
        };
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentsCreated(content));
        } catch (error) {
            dispatch(commentsCreateField(error.message));
        }
    };

export const removeComment = (id) => async (dispatch) => {
    dispatch(commentsRemoveRequested());
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(commentsRemoved(id));
        }
    } catch (error) {
        dispatch(commentsRemoveRequestedField(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
