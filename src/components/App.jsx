import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import Pagination from "./Pagination";
import { API_URL, API_KEY_3 } from "../utils/api";

// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: JSON.parse(localStorage.getItem("movies")) || [],
      sort_by: "popularity.desc",
      page: 1,
      totalPages: ""
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies();
    }
  }

  getMovies = page => {
    const apiFullLink = `${API_URL}/discover/movie?api_key=${API_KEY_3}&page=${
      this.state.page
    }&sort_by=${this.state.sort_by}`;
    fetch(apiFullLink)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("data", data);
        this.setState({
          movies: data.results,
          totalPages: data.total_pages
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteMovie = movie => {
    console.log(movie.id);
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);

    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    console.log(movie);
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);
    // localStorage.setItem(movie.id, JSON.stringify(movie));
    // console.log("G", JSON.parse(localStorage.getItem("movie")));
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
    localStorage.setItem("movies", JSON.stringify(updateMoviesWillWatch));
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );
    // localStorage.removeItem(movie.id);
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
    localStorage.setItem("movies", JSON.stringify(updateMoviesWillWatch));
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value,
      page: 1
    });
  };

  moveToNextPage = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1
      }),
      () => this.getMovies()
    );
  };

  moveToPrevPage = () => {
    this.setState(
      prevState => ({
        page: prevState.page - 1
      }),
      () => this.getMovies()
    );
  };

  render() {
    // console.log("render", this);
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                      moviesWillWatch={this.state.moviesWillWatch}
                    />
                  </div>
                );
              })}
            </div>
            <div className="row mb-4 justify-content-center">
              <div className="col-12">
                <Pagination
                  moveToNextPage={this.moveToNextPage}
                  moveToPrevPage={this.moveToPrevPage}
                  page={this.state.page}
                  totalPages={this.state.totalPages}
                />
              </div>
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
