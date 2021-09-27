import {Person} from "./Person";

export class Match {

    public id: string;
    public selectedPerson: Person;
    public date: string;

    public constructor(id: string, selectedPerson: Person, date: string) {
        this.id = id;
        this.selectedPerson = selectedPerson;
        this.date = date;
    }
}