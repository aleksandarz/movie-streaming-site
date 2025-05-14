import { singleMovieSearchInterface } from "../intefaces/single-movie-search-interface";

export function saveSearchParams(movie: singleMovieSearchInterface): void
{
    const existingMovies = getAllMovieSearches();
    const alreadyExists: boolean = existingMovies.some((m: singleMovieSearchInterface) => m.name.trim().toLowerCase() === movie.name.trim().toLowerCase() && m.year === movie.year);
    if (alreadyExists)
    {
        return;
    }
    existingMovies.push(movie);
    localStorage.setItem("moviesSearch", JSON.stringify(existingMovies));
}

export function getAllMovieSearches(): singleMovieSearchInterface[]
{
    const movieData = localStorage.getItem("moviesSearch");
    return movieData ? JSON.parse(movieData) : [];
}