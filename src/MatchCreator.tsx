import React, {useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import './MatchCreator.css';
import CustomCard from "./CustomCard";
import {useTranslation} from "react-i18next";
import UserContext from './UserContext'
import {User} from "./User";
import {Person} from "./Person";

/**
 * Component in charge of creating a "Match" beetwen the user, and a random person that fit our search criteria.
 */
export default function MatchCreator(props : any) {

    const user = useContext(UserContext)

    const [currentPerson, setCurrentPerson] = useState(getRandomPerson(props, user));
    const [personSelected, setPersonSelected] = useState(null);
    const [matchDate, setMatchDate] = useState(null)

    const { t } = useTranslation();

    if (personSelected !== undefined && personSelected !== null) {
        return (
            <div>
                <Button variant="outline-primary" className={"match-go-back"} onClick={props.handleCancel}>Go
                    back</Button>
                <div className={"match-creator"}>
                    <h1>{t('match-creator-title')}</h1>
                    <Form>
                        <CustomCard person={personSelected} categories={props.categories}/>
                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>{t('match-creator-date-select')}</Form.Label>
                            <Form.Control type="date" onChange={e => setMatchDate(e.target.value)} name={"date"} required/>
                        </Form.Group>
                        <div className={"match-btn-group"}>
                            <Button variant="outline-primary"
                                    onClick={() => setPersonSelected(null)}>{t('match-creator-btn-cancel')}</Button>
                            <Button onClick={() => createMatch(props, personSelected, matchDate)}
                                    disabled={matchDate === null}>{t('match-creator-create-match')}</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    } else {
        // We didn't find a single person based on our search criteria
        if (currentPerson === undefined) {
            return (
                <div className={"main-display"}>
                    <p className={"no-more-person"}>{t('match-creator-no-more-person')}</p>
                </div>
            )
        }
        return (
            <div>
                <Button variant="outline-primary" className={"match-go-back"} onClick={props.handleCancel}>Go
                    back</Button>
                <div className={"match-creator"}>
                    <h1>{t('match-creator-title')}</h1>
                    <Form>
                        <CustomCard person={currentPerson} categories={props.categories}
                                    t={t}/>
                        <div className={"match-btn-group"}>
                            <Button variant="outline-primary"
                                    onClick={() => setCurrentPerson(getRandomPerson(props, user))}>{t('match-creator-btn-new-person')}</Button>
                            <Button
                                onClick={() => setPersonSelected(currentPerson)}>{t('match-creator-btn-choose-person')}</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

function getRandomPerson(props : any, user : User) {
    console.log(props)
    let concatPeople = [].concat(props.people)
        .filter(person => person.location <= user.distance)

    if(!user.ignoreCategory)
        concatPeople = concatPeople.filter(person => person.category === parseInt(user.category))

    return concatPeople[Math.floor(Math.random() * concatPeople.length)];
}

function createMatch(props : any, personSelected : Person, matchDate : string){
    const match = {id: Math.floor(Math.random() * 100000000), selectedPerson: personSelected, date: matchDate}
    props.handleMatchCreation(match)
}
