class Meal {
    constructor(id, categoryIds, title, ingredients, duration, 
        steps, score, ownerId){
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.ingredients = ingredients;
        this.duration = duration
        this.steps = steps;
        this.score = score;
        this.ownerId = ownerId
    }
}

export default Meal;