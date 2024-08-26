import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ApiClient from '../config/ApiClient';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });

    const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
        try {
            const response = await ApiClient.post('/auth/register', {
                username: values.username,
                password: values.password,
                email: values.email,
            });
            console.log('Registration successful:', response.data);
            resetForm();
        } catch (error) {
            setErrors({ submit: 'Registration failed. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Register</h2>
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
                            <label>Confirm Password</label>
                            <Field type={showPassword ? 'text' : 'password'} name="confirmPassword" />
                            <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
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
                        <div>
                            <label>Email</label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                        </div>
                        {errors.submit && <div style={{ color: 'red' }}>{errors.submit}</div>}
                        <button type="submit" disabled={isSubmitting}>Register</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
