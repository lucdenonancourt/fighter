import React from "react";
import {Card, Button} from "react-bootstrap";
import "./MatchList.css"
import {useTranslation} from "react-i18next";
import {Match} from "./Match";

export default function MatchList(props : any) {

    const { t } = useTranslation();

    // If we have an empty list of matches, we display a simple message
    if(props.matches.length === 0) {
        return (
            <p className={'list-empty'}>{t('match-list-empty')}</p>
        )
    } else {
        return (
            <div className={'match-list-group'}>
                <Button variant="outline-danger" className={"match-remove-all"} onClick={() => props.removeAllMatches()}>{t('match-list-btn-cancel-all')}</Button>
                {createList(props)}
            </div>
        )
    }
}


function createList(props : any) {

    let items = [];
    let matches = props.matches
    matches.sort((a : Match, b : Match) => {
        return Date.parse(a.date) - Date.parse(b.date)
    })
    for (let i = 0; i < matches.length; i++) {
        const date = new Date(Date.parse(matches[i].date));

        // @ts-ignore
        items.push(
            <Card className={"text-center"}>
                <Card.Header>{date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    <Button variant="primary" className={"btn-remove-match"} onClick={() => props.handleMatchRemoval(matches[i].id)}>X</Button>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{matches[i].selectedPerson.name}</Card.Title>
                    <Card.Subtitle className={""}>{matches[i].selectedPerson.quote}</Card.Subtitle>
                </Card.Body>
            </Card>
        );
    }
    return items;
}