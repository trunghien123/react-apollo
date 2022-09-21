import { useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { CREATE_HERO } from 'src/graphql/mutations/hero';
import GET_PROFILE from 'src/graphql/queries/profile';
import Hero from '../hero';

const MyProfile = () => {
    const { loading, error, data, refetch } = useQuery(GET_PROFILE, { fetchPolicy: 'no-cache' });
    const [handleCreateHero, { data: dataCreateHero }] = useMutation(CREATE_HERO);
    const [modalShow, setModalShow] = useState(false);
    const callbackRefreshHero = (data: boolean) => {
        if(data) {
            refetch();
        }
    }
    return (
        <>
            {
                data && <div className="my-profile">
                    <Button variant="primary" onClick={() => setModalShow(true)}>Add new</Button>
                    <p className="my-profile_username"><b>Name:</b> {data.me.firstname + ' ' + data.me.lastname}</p>
                    <p className="my-profile_email"><b>Email:</b> {data.me.email}</p>
                    <b className="my-profile_heros">My Hero: </b>
                    <div className="my-profile_heros-list">
                        {data.me.heroes?.length > 0 ? (
                            <Hero callbackRefreshHero={callbackRefreshHero} isDelete={true} listHeros={data.me.heroes} />
                        ) : "No data"}
                    </div>
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        dialogClassName='modal-add-new'
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add New Hero
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                onSubmit={(values, { setSubmitting }) => {
                                    handleCreateHero({
                                        variables: values, onCompleted: () => {
                                            alert("Create new hero successfully!!!");
                                            setModalShow(false);
                                            refetch();
                                        }
                                    });
                                    setSubmitting(false);
                                }}
                                initialValues={{
                                    realName: '',
                                    alterEgo: ''
                                }}
                                validate={values => {
                                    const errors: any = {};
                                    if (!values.realName) {
                                        errors.realName = 'Required';
                                    }

                                    if (!values.alterEgo) {
                                        errors.alterEgo = 'Required';
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
                                            <Form.Label>Real Name </Form.Label>
                                            <Form.Control type="text" required name="realName" value={values.realName} onChange={handleChange} isInvalid={!!errors.realName} />
                                            <div className="text-danger">{errors.realName && touched.realName && errors.realName}</div>
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Alter Ego</Form.Label>
                                            <Form.Control type="text" required name="alterEgo" value={values.alterEgo} onChange={handleChange} isInvalid={!!errors.alterEgo} />
                                            <div className="text-danger">{errors.alterEgo && touched.alterEgo && errors.alterEgo}</div>
                                        </Form.Group>
                                        <div className="text-center">
                                            <Button disabled={isSubmitting} type="submit" className="">Create New</Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Modal.Body>
                    </Modal>
                </div>
            }
        </>
    );
};

export default MyProfile;