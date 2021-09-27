import './App.css';
import React from "react";
import {Button} from 'react-bootstrap';
import UserForm from "./UserForm";
import MatchCreator from "./MatchCreator";
import JohnRambo from "./assets/john-rambo.jpg";
import T800 from "./assets/teminator.jpg";
import ChuckNorris from "./assets/chuck-norris.jpg";
import JamesBond from "./assets/james-bond.jpg";
import LaraCroft from "./assets/lara-croft.jpg";
import EllenRipley from "./assets/ellen-ripley.jpg";
import JasonStatham from "./assets/jason-statham.jpg";
import DwayneJohnson from "./assets/dwayne-johnson.jpg";
import LiamNeeson from "./assets/liam-neeson.jpg";
import JeanClaudevanDamme from "./assets/jean-claude-van-damme.jpg";
import JohnMcClane from "./assets/john-mcclane.jpg";
import JohnWick from "./assets/john-wick.jpg";
import BeatrixKiddo from "./assets/beatrix-iddo.jpg";
import TylerDurden from "./assets/tyler-durden.jpg";
import EthanHunt from "./assets/ethan-hunt.jpg";
import BruceLee from "./assets/bruce-lee.jpg";
import JasonBourne from "./assets/jason-bourne.jpg";
import Vasquez from "./assets/vasquez.jpg";
import SarahConnor from "./assets/sarah-connor.jpg";
import TinkyWinky from  "./assets/tinky-winky.jpg";
import CustomNavbar from "./CustomNavbar";
import MatchList from "./MatchList";
import i18n from "i18next";
import {withTranslation} from "react-i18next";
import { UserProvider } from './UserContext'
import {Match} from "./Match";
import {User} from "./User";
import {Person} from "./Person";
import {Categories} from "./Categories";

class App extends React.Component<any, any>{
    constructor(props : any) {
        super(props);

        let currentUser: User = null;
        let accountCreation = false;
        if(localStorage.getItem('userData') !== null){
            const currentUserStr = localStorage.getItem('userData')
            currentUser = JSON.parse(currentUserStr);
        } else {
            accountCreation = true;
        }

        let matches: Match[] = []
        if(localStorage.getItem('matches') !== null){
            const matchesStr = localStorage.getItem('matches')
            matches = JSON.parse(matchesStr);
        }

        let version = "fighter"
        if(localStorage.getItem('version') !== null){
            version = localStorage.getItem('version')
            version = JSON.parse(version);
            i18n.changeLanguage(version);
        }

        let categories = categories_fighter
        if(version === "worker"){
            categories = categories_worker;
        }

        this.state = {
            currentUser: currentUser,
            people: people,
            categories: categories,
            createMatchState: false,
            accountModification: false,
            accountCreation: accountCreation,
            matches: matches
        };
    }

    /*
     * This method is a bit to complex for my taste, and we could (and should) use some kind of Routing api
     * to simplify the process, and allow the user to navigate in our app freely
     */
    render() {
        if(this.state.accountCreation || this.state.accountModification) {
            return (
                <UserProvider value={this.state.currentUser}>
                    <CustomNavbar handleLogout = {this.handleLogout} handleAccountModification = {this.handleAccountModification} changeVersion = {this.changeVersion}/>
                    <UserForm categories={this.state.categories} handleAccountCreation = {this.handleAccountCreation} t={this.props.t}/>
                </UserProvider>
            )
        }
        if (this.state.createMatchState) {
            return (
                <UserProvider value={this.state.currentUser}>
                    <CustomNavbar handleLogout = {this.handleLogout} handleAccountModification = {this.handleAccountModification} changeVersion = {this.changeVersion}/>
                    <MatchCreator people={this.state.people} categories={this.state.categories} handleMatchCreation = {this.handleMatchCreation}  handleCancel = {this.handleCancel}/>
                </UserProvider>
            )
        }
        return (
            <UserProvider value={this.state.currentUser}>
                <CustomNavbar handleLogout = {this.handleLogout} handleAccountModification = {this.handleAccountModification} changeVersion = {this.changeVersion}/>
                <div className={"main-display"}>
                    <h1 className={"app-slogan"}>{this.props.t('app-slogan')}</h1>
                    <MatchList matches={this.state.matches} handleMatchRemoval = {this.handleMatchRemoval} removeAllMatches = {this.removeAllMatches}/>
                    <Button variant="primary" size="lg" onClick={this.createMatchState}>
                        {this.props.t('app-btn-find-person')}
                    </Button>
                </div>
            </UserProvider>
        )
    }

    /**
     * Switch the current state so that we load our "MatchCreator" component on render
     */
    createMatchState = () =>{
        this.setState({createMatchState: true})
    }


    /**
     * Returned from our MatchCreator component with the match created
     * @param match Match created on our component
     */
    handleMatchCreation = (match : Match) =>{
        this.setState({matches:[...this.state.matches, match]}, () => {
            localStorage.setItem('matches', JSON.stringify(this.state.matches));
        });
        this.setState({createMatchState: false})
    }

    /**
     * We switch our createMatchState to stay on our "Match List" view
     */
    handleCancel = () => {
        this.setState({createMatchState: false})
    }

    /**
     * Returned from our UserForm component. We store the user in our localStorage
     * @param user User created with our form
     */
    handleAccountCreation = (user : User) =>{
        localStorage.setItem('userData', JSON.stringify(user));
        this.setState({currentUser: user})
    }

    /**
     * Returned from our navbar when clicking on the user name
     */
    handleAccountModification = () =>{
        this.setState({accountModification: true})
    }

    /**
     * Returned from our navbar when clicking on the logout button
     */
    handleLogout = () =>{
        localStorage.clear();
        this.setState({currentUser: {}, accountCreation: true})
    }

    /**
     * Returned from our MatchList component when removing all elements
     * @param id The id of the match to remove
     */
    handleMatchRemoval = (id : string) =>{
        this.setState({matches: this.state.matches.filter((match: Match) => match.id !== id)})
    }

    /**
     * In my opinion, this is the kind of methods that don't require explanation....
     */
    removeAllMatches = () => {
        this.setState({matches: []})
    }

    /**
     * Change the current version of our app.
     * In real life, we should switch language, but in our little experiment, it switch the context of the app
     * @param version
     */
    changeVersion = (version : string) => {
        i18n.changeLanguage(version);
        if(version === "worker") {
            this.setState({categories: categories_worker})
            localStorage.setItem('version', JSON.stringify(version));
        } else {
            this.setState({categories: categories_fighter})
            localStorage.setItem('version', JSON.stringify(version));
        }
    }
}

export default withTranslation()(App);

// Our "database" for the fighter app
const people : Person[] = [
    {id: 1, name: "John Rambo", quote: "Don't push it or I'll give you a war you won't believe.", category: 4, location: 20, profilpicture: JohnRambo},
    {id: 2, name: "T-800", quote: "I need your clothes, your boots, and your motorcycle.", category: 5, location: 10, profilpicture: T800},
    {id: 3, name: "Chuck Norris", quote: "Men are like steel. When they lose their temper, they lose their worth.", category: 4, location: 30, profilpicture: ChuckNorris},
    {id: 4, name: "James Bond", quote: "BOND. James BOND", category: 3, location: 50, profilpicture: JamesBond},
    {id: 5, name: "Lara Croft", quote: "A famous explorer once said, that the extraordinary is in what we do, not who we are.", category: 2, location: 10, profilpicture: LaraCroft},
    {id: 6, name: "Ellen Ripley", quote: "This is Ripley, last survivor of the Nostromo, signing off.", category: 2, location: 60, profilpicture: EllenRipley},
    {id: 7, name: "Jason Statham", quote: "Wish I'd taken more time to stop and smell the roses so to speak. Guess it's too late for that now.", category: 4, location: 10, profilpicture: JasonStatham},
    {id: 8, name: "Dwayne Johnson", quote: "Can you smell what the rock is cooking ?!", category: 5, location: 10, profilpicture: DwayneJohnson},
    {id: 9, name: "Liam Neeson", quote: "i don't know where you are but i will find you, and I will beat you", category: 3, location: 0, profilpicture: LiamNeeson},
    {id: 10, name: "Jean-Claude van Damme", quote: "If you phone a psychic and she doesn't answer the phone before it rings, hang up.", category: 4, location: 80, profilpicture: JeanClaudevanDamme},
    {id: 11, name: "John McClane", quote: "Yippie-Ki-Yay, Motherfucker!", category: 3, location: 40, profilpicture: JohnMcClane},
    {id: 12, name: "John Wick", quote: "You Wanted Me Back...I’m Back!", category: 3, location: 20, profilpicture: JohnWick},
    {id: 13, name: "Beatrix Kiddo", quote: "I am gonna ask you questions. And every time you don't give me answers, I'm gonna cut something off.", category: 2, location: 30, profilpicture: BeatrixKiddo},
    {id: 14, name: "Tyler Durden", quote: "I don't want to die without any scars.", category: 3, location: 10, profilpicture: TylerDurden},
    {id: 15, name: "Ethan Hunt", quote: "Desperate Times, Desperate Measures.", category: 3, location: 40, profilpicture: EthanHunt},
    {id: 16, name: "Bruce Lee", quote: "Showing off is the fool's idea of glory.", category: 2, location: 70, profilpicture: BruceLee},
    {id: 17, name: "Jason Bourne", quote: "I Will Bring This Fight To Your Doorstep", category: 3, location: 50, profilpicture: JasonBourne},
    {id: 18, name: "Vasquez", quote: "\"Hey Vasquez, have you ever been mistaken for a man?\" No. Have you?", category: 2, location: 40, profilpicture: Vasquez},
    {id: 19, name: "Sarah Connor", quote: "There is no fate but what we make for ourselves.", category: 2, location: 30, profilpicture: SarahConnor},
    {id: 20, name: "Tinky Winky", quote: "Uh-oh...", category: 1, location: 80, profilpicture: TinkyWinky}
]

const categories_fighter: Categories[] = [
    {id: 1, label: "light flyweight"},
    {id: 2, label: "lightweight"},
    {id: 3, label: "middleweight"},
    {id: 4, label: "heavyweight"},
    {id: 5, label: "super heavyweight"},
]

const categories_worker: Categories[] = [
    {id: 1, label: "Clown"},
    {id: 2, label: "Contractor"},
    {id: 3, label: "Financial advisor"},
    {id: 4, label: "Lawyer"},
    {id: 5, label: "Developer"},
]