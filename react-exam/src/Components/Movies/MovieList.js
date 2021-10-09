import React from "react";
import "../../Asset/Css/movies.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { QueryContext, ContentContext } from "../Search/QueryContext";

export default function Movies(props) {
  //Hooks
  const [movies, setMovies] = useState([]);
  const { Query, setQuery } = useContext(QueryContext);
  const { ImdbID, setImdbID } = useContext(ContentContext);
  // Api request
  const getData = async (Query) => {
    const response = await axios
      .get("https://omdbapi.com/?s=" + Query + "&apikey=8c23acbc")
      .then((result) => {
        console.log(result.data.Search);
        console.log("Movie query is : " + Query);

        if (result.data.Search) {
          setMovies(result.data.Search);
        }
      });
  };

  // Hook
  useEffect(() => {
    console.log("useEffect ran");
    getData(Query);
  }, [Query]);

  const ClickHandler = (event) => {
    setImdbID(event.target.title);
    console.log(event.target);
  };

  return (
    <div className="MovieContainer">
      {movies.map(({ Poster, Title, imdbID }) => (
        <div key={imdbID} className="Movie">
          <img
            src={Poster}
            alt="movie"
            title={imdbID}
            onClick={ClickHandler}
          ></img>
          <h3 className="title">{Title}</h3>
        </div>
      ))}
    </div>
  );
}
