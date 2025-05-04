import {callOMDBApi} from "./services/omdbApiService";
import {yearGenerator} from "./helpers/yearGeneratorHelpers";

yearGenerator(2025, 1960, 2025);

const searchMovieButton = document.querySelector("#search-movie") as HTMLButtonElement;
searchMovieButton.addEventListener("click", async function() {
    const movieName = document.querySelector("#movie-name") as HTMLInputElement;
    const year = document.querySelector("#year-selection") as HTMLSelectElement;

    if (movieName.value.trim() === "") {
        alert("Please enter a movie name");
        return;
    }

    const response = await callOMDBApi([
        { key: "s", value: movieName.value },
        { key: "y", value: year.value },
    ]);

    console.log(response);
});

