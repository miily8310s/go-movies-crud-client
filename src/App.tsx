import { useForm } from "react-hook-form";
import useSWR from "swr";
import "./App.css";
import { fetcher, httpClient } from "./lib/fetcher";

interface Movie {
  ID: string;
  Isbn: string;
  Title: string;
  Director: { FirstName: string; LastName: string };
}

interface MovieFormValues {
  Isbn: string;
  Title: string;
  Director: { FirstName: string; LastName: string };
}

function App() {
  const {
    data: movies,
    error,
    isLoading,
    mutate,
  } = useSWR<Movie[]>("movies", fetcher);
  const { register, handleSubmit } = useForm<MovieFormValues>();

  const onClickAddMovie = async (data: MovieFormValues) => {
    httpClient.post(`/movies`, data).then((res) => {
      console.log(res);
      mutate(movies);
    });
  };

  const onClickDeleteMovie = async (id: string) => {
    httpClient.delete(`/movie/${id}`).then(() => {
      mutate(
        movies?.filter((movie) => {
          return movie.ID !== id;
        })
      );
    });
  };

  if (!movies) {
    if (isLoading) {
      return <div className="App">loading...</div>;
    }
    if (error) {
      return <div className="App">not connect to api...</div>;
    }
  }
  return (
    <div className="App movies">
      <form onSubmit={handleSubmit((data) => onClickAddMovie(data))}>
        <input {...register("Title")} placeholder="First name" />
        <input {...register("Isbn")} placeholder="First name" />
        <input {...register("Director.FirstName")} placeholder="First name" />
        <input {...register("Director.LastName")} placeholder="First name" />
        <input type="submit" />
      </form>
      <div className="movie">
        <div className="column">movie ID</div>
        <div className="column">movie title</div>
        <div className="column">IMDb score</div>
        <div className="column">Director</div>
        <div className="column"></div>
      </div>
      {movies!.map((movie) => {
        return (
          <div className="movie" key={`${movie.ID}${movie.Title}`}>
            <div>{movie.ID}</div>
            <div>{movie.Title}</div>
            <div>{movie.Isbn}</div>
            <div>
              {movie.Director.FirstName} {movie.Director.LastName}
            </div>
            <div onClick={() => onClickDeleteMovie(movie.ID)}>ゴミ箱</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
