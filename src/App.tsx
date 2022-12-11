import useSWR from "swr";
import "./App.css";
import { fetcher } from "./lib/fetcher";

interface Movie {
  ID: string;
  Isbn: string;
  Title: string;
  Director: { FirstName: string; LastName: string };
}

function App() {
  const { data: movies, error, isLoading } = useSWR<Movie[]>("movies", fetcher);
  if (isLoading) {
    <div className="App">loading...</div>;
  }
  if (error) {
    <div className="App">not connect to api...</div>;
  }
  return (
    <div className="App movies">
      <div className="movie">
        <div className="column">movie ID</div>
        <div className="column">movie title</div>
        <div className="column">ISBN score</div>
        <div className="column">Director</div>
      </div>
      {movies?.map((movie) => {
        return (
          <div className="movie" key={`${movie.ID}${movie.Title}`}>
            <div>{movie.ID}</div>
            <div>{movie.Title}</div>
            <div>{movie.Isbn}</div>
            <div>
              {movie.Director.FirstName} {movie.Director.LastName}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
