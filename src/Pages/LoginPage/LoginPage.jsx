import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { setLoginThunk } from "../../store/reducers/authReducer";
import { Navigate } from "react-router-dom";
import styles from './LoginPage.module.css';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required'),
});

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
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Login</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => login(values)}
        >
          {({ isSubmitting }) => (
            <Form className={styles.loginForm}>
              <div className={styles.formGroup}>
                <Field 
                  className={styles.formInput} 
                  name="email" 
                  placeholder="Email" 
                />
                <ErrorMessage name="email" component="div" className={styles.error} />
              </div>
              <div className={styles.formGroup}>
                <Field
                  className={styles.formInput}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className={styles.error} />
              </div>
              <div className={styles.rememberGroup}>
                <label className={styles.rememberLabel}>
                  <Field type="checkbox" name="rememberMe" className={styles.rememberCheckbox} />
                  Remember me
                </label>
              </div>
              <button 
                type="submit" 
                className={styles.loginButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <div className={styles.testCredentials}>
          <h4>Test Credentials:</h4>
          <p>Email: valod@samuraijs.com</p>
          <p>Password: how you want</p>
          <p>Email: valod@gmail/mail.com</p>
          <p>Password: valod123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;