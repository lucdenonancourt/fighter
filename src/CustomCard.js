import React from "react";
import {Card} from "react-bootstrap";
import "./CustomCard.css"

export default class CustomCard extends React.Component {

    render() {
        const person = this.props.person
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={person.profilpicture} />
                <Card.Body>
                    <Card.Title>{person.name}</Card.Title>
                    <Card.Subtitle className="blockquote-footer">
                        {person.quote}
                    </Card.Subtitle>
                    <Card.Text>
                        {this.props.t('custom-card-text-category')}{this.getLabelCategory(person.category)} <br/>
                        {this.props.t('custom-card-text-distance')}{person.location}km
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    getLabelCategory(id) {
        return [].concat(this.props.categories).find(category => parseInt(category.id) === parseInt(id)).label
    }
}
