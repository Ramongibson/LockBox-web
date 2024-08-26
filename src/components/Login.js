import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ApiClient from '../config/ApiClient';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await ApiClient.post('/auth/login', values);
            console.log('Login successful:', response.data);
        } catch (error) {
            setErrors({ submit: 'Invalid username or password' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <div>
                            <label>Username</label>
                            <Field type="text" name="username" />
                            <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                        </div>
                        <div>
                            <label>Password</label>
                            <Field type={showPassword ? 'text' : 'password'} name="password" />
                            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                                Show Password
                            </label>
                        </div>
                        {errors.submit && <div style={{ color: 'red' }}>{errors.submit}</div>}
                        <button type="submit" disabled={isSubmitting}>Login</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
