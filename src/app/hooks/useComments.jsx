import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(null);
    }, []);

    async function createComment(data) {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            _id: nanoid(),
            userId: currentUser._id
        };
        console.log(comment);
    }
    return (
        <CommentsContext.Provider value={{ comments, createComment }}>
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
