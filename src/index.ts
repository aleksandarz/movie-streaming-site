import { callOMDBApi } from "./services/omdbApiService";
import { yearGenerator } from "./helpers/yearGeneratorHelpers";

yearGenerator(2025, 1960, 2025);

const searchMovieButton = document.querySelector("#search-movie") as HTMLButtonElement;
const moviesDiv = document.querySelector(".movies-div") as HTMLDivElement;

searchMovieButton.addEventListener("click", async function() {
    const errorMessage = document.createElement("p") as HTMLParagraphElement;

    moviesDiv.innerHTML = "";
    errorMessage.innerHTML = "";

    const movieName = document.querySelector("#movie-name") as HTMLInputElement;
    const year = document.querySelector("#year-selection") as HTMLSelectElement;

    if (movieName.value.trim() === "")
    {
        alert("Please enter a movie name");
        return;
    }

    let response = await callOMDBApi([
        { key: "s", value: movieName.value },
        { key: "y", value: year.value },
    ]);

    console.log(response);

    if (response.data.Search)
    {
        showMovies(response.data.Search);
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
            showMovies(response.data.Search);
        }
    }
});

function showMovies(movies: any[]): void {
    movies.forEach((movie) => {
        const movieDiv = document.createElement("div") as HTMLDivElement;
        movieDiv.classList.add("movie");

        const moviePoster = document.createElement("img") as HTMLImageElement;
        moviePoster.src = movie.Poster;
        moviePoster.alt = movie.Title;

        const movieTitle = document.createElement("h4") as HTMLHeadingElement;
        movieTitle.innerText = movie.Title;

        movieDiv.append(movieTitle, moviePoster);
        moviesDiv.append(movieDiv);
    });
}






