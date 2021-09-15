import React from "react";
import {Button, Form, Modal} from "react-bootstrap";

export default class UserForm extends React.Component {

    constructor(props) {
        super(props);
        if(Object.keys(this.props.user).length !== 0) {
            this.state = {email: this.props.user.email, name: this.props.user.name, category: this.props.user.category, distance: this.props.user.distance, ignorecategory: this.props.user.ignorecategory, validated: true}
        } else {
            // Default value
            this.state = {category: 3, distance:40, validated: false};
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /**
     * Pretty standard submit : We return our user if our form is valid
     * @param event The event linked to our form
     */
    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        this.setState({validated: true})
        this.setState({show: false})
        const user = {email: this.state.email, name: this.state.name, category: this.state.category, distance: this.state.distance, ignorecategory: this.state.ignorecategory}
        this.props.handleAccountCreation(user)
    }

    /**
     * On every change, we modify our state
     * @param event The event linked to the modification in our form
     */
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Modal
                show={true}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>{this.props.t('user-form-title')}</Modal.Title>
                    <p>{this.props.t('user-form-subtitle')}</p>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name={"email"} value={this.state.email}
                                          onChange={this.handleInputChange} required/>
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name={"name"} value={this.state.name}
                                          onChange={this.handleInputChange} required/>
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>{this.props.t('user-form-categories')}</Form.Label>
                            <Form.Control as="select" value={this.state.category} name={"category"} onChange={this.handleInputChange} required>
                                {this.createCategories()}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDistance">
                            <Form.Label>{this.props.t('user-form-distance')}{this.state.distance}km area from your position</Form.Label>
                            <Form.Control type="range"  min="0" max="100" step="20" name={"distance"} value={this.state.distance} onChange={this.handleInputChange} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formIgnoreCategory">
                            <Form.Check type={'checkbox'} label={this.props.t('user-form-ignore-category')} name={"ignorecategory"} checked={this.state.ignorecategory} onChange={this.handleInputChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </Modal.Body>
            </Modal>
        )
    }

    /**
     * To lighten the render method, and improve visibility
     * @returns {*[]} The list of <option> that we created
     */
    createCategories() {
        let items = [];
        for (let i = 0; i < this.props.categories.length; i++) {
            const id = this.props.categories[i].id;
            const label = this.props.categories[i].label;
            items.push(<option key={id} value={id}>{label}</option>);
        }
        return items;
    }
}