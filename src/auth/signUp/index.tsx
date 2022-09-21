import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import SIGN_UP from 'src/graphql/mutations/signup';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [handleSignUp, { loading, error, data }] = useMutation(SIGN_UP, { errorPolicy: "all" });
    useEffect(() => {
        if (data) {
            alert("Sign up successfully!!!")
            navigate('/sign-in');
        }
        if (error) {
            alert(error.graphQLErrors.map(({ message }, i) => message).join(", "));
        }
    }, [data, error])

    return (
        <div className="sign-up">
            <Formik
                onSubmit={(values, { setSubmitting }) => {
                    handleSignUp({ variables: values });
                    setSubmitting(false);
                }}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: 'Devusers1'
                }}
                validate={values => {
                    const errors: any = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.firstName) {
                        errors.firstName = 'Required';
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Required';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    isSubmitting
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" required name="firstName" value={values.firstName} onChange={handleChange} isInvalid={!!errors.firstName} />
                            <div className="text-danger">{errors.firstName && touched.firstName && errors.firstName}</div>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" required name="lastName" value={values.lastName} onChange={handleChange} isInvalid={!!errors.lastName} />
                            <div className="text-danger">{errors.lastName && touched.lastName && errors.lastName}</div>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" required name="email" value={values.email} onChange={handleChange} isInvalid={!!errors.email} />
                            <div className="text-danger">{errors.email && touched.email && errors.email}</div>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required name="password" value={values.password} onChange={handleChange} isInvalid={!!errors.password} />
                            <div className="text-danger">{errors.password && touched.password && errors.password}</div>
                        </Form.Group>
                        <div className="text-center">
                            <Button disabled={isSubmitting} type="submit" className="">Sign Up</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;