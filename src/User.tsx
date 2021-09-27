export class User {

    public name: string;
    public distance: string;
    public category: string;
    public ignoreCategory: Boolean;

    public constructor(name: string, distance: string, category: string, ignoreCategory: Boolean) {
        this.name = name;
        this.distance = distance;
        this.category = category;
        this.ignoreCategory = ignoreCategory;
    }

}
