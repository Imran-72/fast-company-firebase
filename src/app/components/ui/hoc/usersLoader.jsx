import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getDataStatus, loadUsersList } from "../../../store/users";

const UsersLoader = ({ children }) => {
    const dispatch = useDispatch();
    const dataStatus = useSelector(getDataStatus());
    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, []);
    if (!dataStatus) return "Loading...";

    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType(
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    )
};
export default UsersLoader;
