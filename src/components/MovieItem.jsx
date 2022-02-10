import React from "react";

class MovieItem extends React.Component {
  state = {
    willWatch: false
  };

  render() {
    const {
      data,
      deleteMovie,
      addMovieToWillWatch,
      deleteMovieFromWillWatch,
      moviesWillWatch
    } = this.props;
    // props.data = {};
    const abc = moviesWillWatch.some(x => x.id === data.id);
    console.log("KK", moviesWillWatch, abc);
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${data.backdrop_path ||
            data.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{data.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating: {data.vote_average}</p>
            {this.willWatch ||
            moviesWillWatch.some(movie => movie.id === data.id) ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.setState({
                    willWatch: false
                  });
                  deleteMovieFromWillWatch(data);
                }}
              >
                Will Watch
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  this.setState({
                    willWatch: true
                  });
                  addMovieToWillWatch(data);
                }}
              >
                Will Watch
              </button>
            )}

            {/* {this.state.willWatch ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.setState({
                    willWatch: false
                  });
                  deleteMovieFromWillWatch(data);
                }}
              >
                Will Watch
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  this.setState({
                    willWatch: true
                  });
                  addMovieToWillWatch(data);
                }}
              >
                Will Watch
              </button>
            )} */}
          </div>
          <button
            type="button"
            onClick={() => {
              deleteMovie(data);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default MovieItem;