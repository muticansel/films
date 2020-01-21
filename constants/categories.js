import Category from '../models/category';
import Film from '../models/film';

export const CATEGORIES = [
    new Category('c1', 'Horror', '#f5428d'),
    new Category('c2', 'Science Fiction', '#f54242'),
    new Category('c3', 'Romance', '#f5a442'),
    new Category('c4', 'Anime', '#f5d142'),
    new Category('c5', 'Drama & Lovely', '#368dff'),
    new Category('c6', 'Crime', '#41d95d'),
    new Category('c7', 'Thriller', '#9eecff'),
    // new Category('c8', 'Asian', '#b9ffb0'),
    // new Category('c9', 'French', '#ffc7ff'),
    // new Category('c10', 'Summer', '#47fced')
];

export const FILMS = [
    new Film('f1', ['c3', 'c5'], "Notebook", 119, 7.6, 2004, "XXXX", ["Ryan Goslip", "XXX"]),
    new Film('f2', ['c1'], "Sample", 180, 6.6, 2011, "XXXX", ["Ryan Goslip", "XXX"])
];