import React from "react";
import {Card} from "react-bootstrap";
import "./CustomCard.css"
import {useTranslation} from "react-i18next";

export default function CustomCard(props : any) {

    const { t } = useTranslation();

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.person.profilpicture} />
            <Card.Body>
                <Card.Title>{props.person.name}</Card.Title>
                <Card.Subtitle className="blockquote-footer">
                    {props.person.quote}
                </Card.Subtitle>
                <Card.Text>
                    {t('custom-card-text-category')}{getLabelCategory(props)} <br/>
                    {t('custom-card-text-distance')}{props.person.location}km
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

function getLabelCategory(props : any) {
    // @ts-ignore
    return [].concat(props.categories).find(category => parseInt(category.id) === parseInt(props.person.category)).label
}