class Film {
    constructor(id, categoryIds, title, duration, imdbScore, 
        year, director, stars){
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.duration = duration;
        this.imdbScore = imdbScore;
        this.year = year;
        this.director = director;
        this.stars = stars
    }
}

export default Film;