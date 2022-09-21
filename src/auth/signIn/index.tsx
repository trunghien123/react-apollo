import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SIGN_IN from 'src/graphql/mutations/signin';
import { set } from 'src/utils/cookie';

const SignIn = () => {
    const navigate = useNavigate();
    const [handleSignIn, { loading, error, data }] = useMutation(SIGN_IN, { errorPolicy: "all" });
    useEffect(() => {
        if (data) {
            console.log(data);
            set("react_apollo_token", data.login.accessToken);
            set("react_apollo_refresh_token", data.login.refreshToken);
            alert("Sign in successfully!!!");
            navigate('/my-profile');
        }
        if (error) {
            alert(error.graphQLErrors.map(({ message }, i) => message).join(", "));
        }
    }, [data, error])
    return (
        <div className="sign-up">
            <Formik
                onSubmit={(values, { setSubmitting }) => {
                    handleSignIn({ variables: values });

                    setSubmitting(false);
                }}
                initialValues={{
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
                            <Form.Label>Email </Form.Label>
                            <Form.Control type="email" required name="email" value={values.email} onChange={handleChange} isInvalid={!!errors.email} />
                            <div className="text-danger">{errors.email && touched.email && errors.email}</div>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required name="password" value={values.password} onChange={handleChange} isInvalid={!!errors.password} />
                            <div className="text-danger">{errors.password && touched.password && errors.password}</div>
                        </Form.Group>
                        <div className="text-center">
                            <Button disabled={isSubmitting} type="submit" className="">Sign In</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignIn;