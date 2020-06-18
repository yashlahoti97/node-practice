import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      rate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    rate: Joi.number().min(0).max(10).label("Daily Rental Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId == "new") return;
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSumbit() {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  }

  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>MovieForm {match.params.id}</h1>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genre", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Number In Stock")}
        {this.renderInput("rate", "Rate")}
        <button
          className="btn btn-primary"
          onClick={() => {
            history.push("/movies");
          }}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
