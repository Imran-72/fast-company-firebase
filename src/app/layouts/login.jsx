import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div
                    className="col-md-6 offset-md-3 shadow p-4"
                    style={{ borderRadius: "10px" }}
                >
                    {formType === "register" ? (
                        <>
                            <h3 className="d-flex justify-content-center mb-4">
                                Register
                            </h3>
                            <RegisterForm />
                            <p className="mt-2">
                                Already have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Sign In
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="d-flex justify-content-center mb-4">
                                Login
                            </h3>
                            <LoginForm />
                            <p className="mt-2">
                                Dont have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Sign Up
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Login;
