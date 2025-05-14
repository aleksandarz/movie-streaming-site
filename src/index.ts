import { callOMDBApi } from "./services/omdb-api-service";
import { yearGenerator } from "./helpers/year-generator-helper";
import { showMovies } from "./helpers/display-movies-helper";
import { saveSearchParams } from "./helpers/save-to-localstorage";
import { getAllMovieSearches } from "./helpers/save-to-localstorage";
import {singleMovieSearchInterface} from "./interfaces/single-movie-search-interface";

yearGenerator(2025, 1960, 2025);

const moviesDiv = document.querySelector(".movies-div") as HTMLDivElement;
const existingMoviesDiv = document.querySelector(".existing-movies-div") as HTMLDivElement;

const searchMovieButton = document.querySelector("#search-movie") as HTMLButtonElement;
const clearAllMovieSearchesButton = document.querySelector(".clear-all-searches") as HTMLButtonElement;

const movieName = document.querySelector("#movie-name") as HTMLInputElement;
const movieYear = document.querySelector("#year-selection") as HTMLSelectElement;

searchMovieButton.addEventListener("click", async function() {
    const errorMessage = document.createElement("span") as HTMLSpanElement;

    moviesDiv.innerHTML = "";
    errorMessage.innerHTML = "";

    if (movieName.value.trim() === "")
    {
        alert("Please enter a movie name");
        return;
    }

    let response = await callOMDBApi([
        { key: "s", value: movieName.value },
        { key: "y", value: movieYear.value },
    ]);

    if (response.data.Search)
    {
        showMovies(response.data.Search, moviesDiv);
        saveSearchParams({ name: movieName.value, year: movieYear.value });
    }
    else if (response.data.Error)
    {
        errorMessage.innerHTML = response.data.Error + "</br> But here are some recommendations";
        moviesDiv.append(errorMessage);

        response = await callOMDBApi([
            { key: "s", value: movieName.value },
        ]);

        if (response.data.Search)
        {
            showMovies(response.data.Search, moviesDiv);
        }
    }
});

const existingMovies: singleMovieSearchInterface[] = getAllMovieSearches();

existingMovies.forEach((movie: singleMovieSearchInterface) => {
    const savedMovie = document.createElement("span") as HTMLSpanElement;
    savedMovie.innerHTML = `${movie.name}: ${movie.year}<br>`;
    savedMovie.style.cursor = "pointer";
    existingMoviesDiv.append(savedMovie);

    savedMovie.addEventListener("click", async function () {
        const response = await callOMDBApi([
            { key: "s", value: movie.name },
            { key: "y", value: movie.year.toString() },
        ]);

        if (response.data.Search) {
            moviesDiv.innerHTML = "";
            showMovies(response.data.Search, moviesDiv);
        }
    });
});

clearAllMovieSearchesButton.addEventListener("click", () => {
    localStorage.clear();
    existingMoviesDiv.innerHTML = "";
});










