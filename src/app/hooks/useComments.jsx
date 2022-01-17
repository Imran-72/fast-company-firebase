import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import commentService from "../services/comment.service";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [comments, setComments] = useState();

    useEffect(() => {
        getComments();
    }, []);

    async function createComment(data) {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            _id: nanoid(),
            userId: currentUser._id
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments((prev) => [...prev, content]);
            addToLocalStorage(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function addToLocalStorage(comments) {
        const all = getCommentsFromLocalStorage();
        all.push(comments);
        localStorage.setItem("Newcomments", JSON.stringify(all));
    }

    function getCommentsFromLocalStorage() {
        return JSON.parse(localStorage.getItem("Newcomments") || "[]");
    }

    async function getComments() {
        try {
            const data = await getCommentsFromLocalStorage();
            setComments(data);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    // async function getComments() {
    //     try {
    //         const { content } = await commentService.getComments(userId);
    //         console.log(content);
    //         setComments(content);
    //     } catch (error) {
    //         errorCatcher(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }
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
            value={{ comments, createComment, isLoading }}
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
