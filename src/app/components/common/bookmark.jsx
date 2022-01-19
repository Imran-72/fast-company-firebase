import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ status, ...rest }) => {
    return (
        <span {...rest} role="button">
            <i className={"bi bi-bookmark-heart" + (status ? "-fill" : "")}></i>
        </span>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool
};

export default BookMark;
