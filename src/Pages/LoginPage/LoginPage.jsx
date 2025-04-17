import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import { setLoginThunk } from "../../store/reducers/authReducer";
import { Navigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  const login = ({ email, password, rememberMe }) => {
    dispatch(setLoginThunk(email, password, rememberMe));
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        onSubmit={(values) => login(values)}
      >
        <Form className="login-form">
          <div className="form-group">
            <label>Email</label>
            <Field className="form-input" name="email" placeholder="email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <Field
              className="form-input"
              type="password"
              name="password"
              placeholder="password"
            />
          </div>
          <div className="form-group">
            <label>
              <Field type="checkbox" name="rememberMe" />
              Remember me
            </label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </Form>
      </Formik>
      <div className="test-credentials">
        <h4>How to login,dear user:</h4>
        <p>Email: valod@samuraijs.com</p>
        <p>Password: how you want</p>
        <p>Email: valod@gmail/mail.com</p>
        <p>Password: valod123</p>
      </div>
    </div>
  );
};

export default LoginPage;
