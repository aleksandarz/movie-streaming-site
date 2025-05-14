
export function showMovies(movies: any[], moviesDiv: HTMLDivElement): void {
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
