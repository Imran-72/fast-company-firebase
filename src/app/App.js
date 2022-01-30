import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <ProfessionProvider>
                    <Switch>
                        <ProtectedRoute
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logOut" component={LogOut} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
