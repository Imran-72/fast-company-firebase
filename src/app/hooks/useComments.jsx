import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import commentService from "../services/comment.service";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments();
    }, [userId]);

    async function createComment(data) {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            _id: nanoid(),
            userId: currentUserId
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments((prev) => [...prev, content]);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) {
                setComments((prev) => prev.filter((c) => c._id !== id));
            }
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    function errorCatcher(error) {
        const { message } = error;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    return (
        <CommentsContext.Provider
            value={{ comments, createComment, isLoading, removeComment }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
