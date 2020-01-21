class Film {
    constructor(id, categoryIds, title, duration, imdbScore, 
        year, director, stars, imageUrl){
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.duration = duration;
        this.imdbScore = imdbScore;
        this.year = year;
        this.director = director;
        this.stars = stars
        this.imageUrl = imageUrl;
    }
}

export default Film;