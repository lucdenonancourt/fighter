import React, {FormEvent, useContext, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import UserContext from './UserContext'

export default function  UserForm(props: any) {

    const user = useContext(UserContext)

    const existUser = user.length !== 0;

    const [email, setEmail] = useState(existUser ? user.email : null);
    const [name, setName] = useState(existUser ? user.name : null);
    const [category, setCategory] = useState(existUser ? user.category : 3);
    const [distance, setDistance] = useState(existUser ? user.distance : 40);
    const [ignoreCategory, setIgnoreCategory] = useState(existUser ? user.ignoreCategory : false);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(true);

    const { t } = useTranslation();
    
    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>{t('user-form-title')}</Modal.Title>
                <p>{t('user-form-subtitle')}</p>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={e => handleSubmit(e, setValidated, setShow, props, email, name, category, distance, ignoreCategory)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name={"email"} value={email}
                                          onChange={e => setEmail(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name={"name"} value={name}
                                          onChange={e => setName(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>{t('user-form-categories')}</Form.Label>
                            <Form.Control as="select" value={category} name={"category"}
                                          onChange={e => setCategory(e.target.value)} required>
                                {createCategories(props)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDistance">
                            <Form.Label>{t('user-form-distance')}{distance}km area from your
                                position</Form.Label>
                            <Form.Control type="range" min="0" max="100" step="20" name={"distance"}
                                          value={distance} onChange={e => setDistance(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formIgnoreCategory">
                            <Form.Check type={'checkbox'} label={t('user-form-ignore-category')}
                                        name={"ignoreCategory"} checked={ignoreCategory}
                                        onChange={e => setIgnoreCategory(e.target.checked)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
        </Modal>
    )
}


function handleSubmit(event : FormEvent<HTMLFormElement>, setValidated: any, setShow: any, props : any, email : string, name : string, category : number, distance : string, ignoreCategory : boolean) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    }
    setValidated(true)
    setShow(false)
    const user = {email: email, name: name, category: category, distance: distance, ignoreCategory: ignoreCategory}
    props.handleAccountCreation(user)
}

function createCategories(props : any) {
    let items = [];
    for (let i = 0; i < props.categories.length; i++) {
        const id = props.categories[i].id;
        const label = props.categories[i].label;
        items.push(<option key={id} value={id}>{label}</option>);
    }
    return items;
}
