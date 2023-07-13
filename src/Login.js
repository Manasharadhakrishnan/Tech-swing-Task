

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import './Login.css'
const validate = (values) => {
    const errors = {};
    if (!values.Username) {
        errors.Username = "Enter the name";
    } else if (!/^[A-Za-z]+$/.test(values.Username)) {
        errors.Username = "Username should only contain letters";
    }

    if (!values.Password) {
        errors.Password = "Enter the password";
    } else if (values.Password.length < 6) {
        errors.Password = "Password must contain at least 6 characters";
    }

    return errors;
};

function Login() {
    const [passwordType, setPasswordType] = useState("password");

    const togglePassword = () => {
        setPasswordType((prevType) =>
            prevType === "password" ? "text" : "password"
        );
    };

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            Username: "",
            Password: "",
        },
        validate,
        onSubmit: (values) => {
            if (!formik.errors.Username && !formik.errors.Password) {
                navigate("/datatable");
            }
        },
    });

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="loginForm shadow-lg rounded-3 pt-3 pb-3">
                <p className="text-center text-dark mt-2 mb-3 fw-bold" style={{ fontSize: "30px" }}>
                    LogIn
                </p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Username"
                                    name="Username"
                                    className=" form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Username}
                                ></input>
                                {formik.touched.Username && formik.errors.Username ? (
                                    <span className="span mx-auto">{formik.errors.Username}</span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-6">
                            <div className="form-group">
                                <div className="password-input-wrapper">
                                    <input
                                        type={passwordType}
                                        id="txtPassword"
                                        autoComplete="off"
                                        placeholder="Password"
                                        name="Password"
                                        className=" mt-3 form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Password}
                                    ></input>
                                    <button
                                        type="button"
                                        id="btnToggle"
                                        className="toggle"
                                        onClick={togglePassword}
                                    >
                                        <i
                                            id="eyeIcon"
                                            className={
                                                passwordType === "password" ? "bx bx-hide" : "bx bx-show"
                                            }
                                        ></i>
                                    </button>
                                </div>
                                {formik.touched.Password && formik.errors.Password ? (
                                    <span className="mb-3 span">{formik.errors.Password}</span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="button d-flex justify-content-center">
                        <input
                            type="submit"
                            className=" btn mt-3 mb-2"
                            value="Login"
                            style={{ backgroundColor: "#F86F03", color: "white" }}
                        ></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
