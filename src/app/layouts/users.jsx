import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <UserProvider>
            {userId ? (
                edit ? (
                    <EditUserPage />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-2">
                            <UsersListPage />
                        </div>
                    </div>
                </div>
            )}
        </UserProvider>
    );
};

export default Users;
