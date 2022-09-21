import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { GET_LIST_HEROS } from 'src/graphql/queries/hero';
import btn_delete from './../../assets/images/delete-button.svg';
import { Button, Modal } from 'react-bootstrap';
import { REMOVE_HERO } from 'src/graphql/mutations/hero';

const Hero = (props: any) => {
    const navigate = useNavigate();
    const { listHeros, isDelete, callbackRefreshHero } = props;
    const [modalShow, setModalShow] = useState(false);
    const [deleteHero, { loading, error, data }] = useMutation(REMOVE_HERO, { errorPolicy: 'all' });

    const handleOpenModal = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        setModalShow(true);
    }
    const handleDeleteHero = (heroId: string) => {
        deleteHero({ variables: { "heroId": heroId }, onCompleted: () => { 
            callbackRefreshHero(true);
            alert("Delete hero successfully!!!"); 
        } });
        if (error) {
            alert("Delete hero fail!!!");
        }
        setModalShow(false);
    }
    return (
        <div className="list-hero">
            {
                listHeros && listHeros.map((hero: any, index: number) =>
                    <div className="hero" key={index}>
                        <a href="" className="hero_card" onClick={() => navigate(`/hero/${hero.id}`)}>
                            <img src={hero.image ? hero.image : 'https://picsum.photos/300/200'} alt={hero.alterEgo} />
                            {isDelete && <div onClick={(e: any) => handleOpenModal(e)} className="hero_card-delete">
                                <img src={btn_delete} alt="" />
                            </div>}
                        </a>
                        <Modal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            dialogClassName='modal-add-new'
                            centered
                        >
                            <Modal.Body className="modal-confirm">
                                <p>
                                    Do you want to delete this hero ?
                                </p>
                                <div className="modal-buttons">
                                    <Button variant="outline-primary" onClick={() => handleDeleteHero(hero.id)}>Yes</Button>
                                    <Button variant="outline-danger" onClick={() => setModalShow(false)}>No</Button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                )
            }
        </div>
    );
};

export default Hero;