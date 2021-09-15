import React from "react";
import {Button, Form} from "react-bootstrap";
import CustomCard from "./CustomCard";
import './MatchCreator.css';

/**
 * Component in charge of creating a "Match" beetwen the user, and a random person that fit our search criteria.
 */
export default class MatchCreator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {currentPerson: this.getRandomPerson(this.props.user.distance, this.props.user.category, this.props.user.ignorecategory), personSelected: null};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeCurrentPerson = this.changeCurrentPerson.bind(this);
        this.selectPerson = this.selectPerson.bind(this);
        this.cancel = this.cancel.bind(this);
        this.createMatch = this.createMatch.bind(this);
    }


    render() {
        if (this.state.selectedPerson !== undefined && this.state.selectedPerson !== null) {
            return (
                <div>
                    <Button variant="outline-primary" className={"match-go-back"} onClick={this.props.handleCancel}>Go
                        back</Button>
                    <div className={"match-creator"}>
                        <h1>{this.props.t('match-creator-title')}</h1>
                        <Form>
                            <CustomCard person={this.state.selectedPerson} categories={this.props.categories}
                                        t={this.props.t}/>
                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label>{this.props.t('match-creator-date-select')}</Form.Label>
                                <Form.Control type="date" onChange={this.handleInputChange} name={"date"} required/>
                            </Form.Group>
                            <div className={"match-btn-group"}>
                                <Button variant="outline-primary"
                                        onClick={this.cancel}>{this.props.t('match-creator-btn-cancel')}</Button>
                                <Button onClick={this.createMatch} disabled={this.state.date === undefined}>{this.props.t('match-creator-create-match')}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            )
        } else {
            // We didn't find a single person based on our search criteria
            if (this.state.currentPerson === undefined) {
                return (
                    <div className={"main-display"}>
                        <p className={"no-more-person"}>{this.props.t('match-creator-no-more-person')}</p>
                    </div>
                )
            }
            return (
                <div>
                    <Button variant="outline-primary" className={"match-go-back"} onClick={this.props.handleCancel}>Go
                        back</Button>
                    <div className={"match-creator"}>
                        <h1>{this.props.t('match-creator-title')}</h1>
                        <Form>
                            <CustomCard person={this.state.currentPerson} categories={this.props.categories}
                                        t={this.props.t}/>
                            <div className={"match-btn-group"}>
                                <Button variant="outline-primary"
                                        onClick={this.changeCurrentPerson}>{this.props.t('match-creator-btn-new-person')}</Button>
                                <Button
                                    onClick={this.selectPerson}>{this.props.t('match-creator-btn-choose-person')}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            )
        }
    }


    getRandomPerson(distance, category, ignorecategory) {
        let people = [].concat(this.props.people)
            .filter(person => person.location <= distance)

        if(!ignorecategory)
            people = people.filter(person => person.category === parseInt(category))

        return people[Math.floor(Math.random() * people.length)];
    }

    changeCurrentPerson(){
        const person = this.getRandomPerson(this.props.user.distance, this.props.user.category, this.props.user.ignorecategory);
        this.setState({currentPerson: person})
    }

    selectPerson(){
        this.setState({selectedPerson : this.state.currentPerson})
    }

    cancel(){
        this.setState({selectedPerson : null})
    }

    createMatch(){
        // Yeah, this method of generating id cannot possibly go wrong.... But this is not a job for the front end
        const match = {id: Math.floor(Math.random() * 100000000), selectedPerson: this.state.selectedPerson, date: this.state.date}
        this.props.handleMatchCreation(match)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
}

