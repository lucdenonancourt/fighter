import React from "react";
import {Card, Button} from "react-bootstrap";
import "./MatchList.css"

export default class MatchList extends React.Component {

    render() {
        // If we have an empty list of matches, we display a simple message
        if(this.props.matches.length === 0) {
            return (
                <p className={'list-empty'}>{this.props.t('match-list-empty')}</p>
            )
        }
        return (
            <div className={'match-list-group'}>
                <Button variant="outline-danger" className={"match-remove-all"} onClick={() => this.props.removeAllMatches()}>{this.props.t('match-list-btn-cancel-all')}</Button>
                {this.createList()}
            </div>
        )
    }

    createList() {

        let items = [];
        let matches = this.props.matches
        matches.sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date)
        })
        for (let i = 0; i < matches.length; i++) {
            const date = new Date(Date.parse(matches[i].date));
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            items.push(
                <Card className={"text-center"}>
                    <Card.Header>{date.toLocaleDateString('en-US', options)}
                        <Button variant="primary" className={"btn-remove-match"} onClick={() => this.props.handleMatchRemoval(matches[i].id)}>X</Button>
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


}