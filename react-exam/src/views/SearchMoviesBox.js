import React, { useState } from "react";

import SearchMovie from "../Components/Search/SearchMovie.js";
import Movies from "../Components/Movies/MovieList.js";
import { movies } from "../Components/Movies/MovieList.js";
import { QueryContext } from "../Components/Search/QueryContext.js";

export default function SearchMoviesBox() {
  //Query with default movies
  let [Query, setQuery] = useState("Batman");

  return (
    <QueryContext.Provider value={{ Query, setQuery }}>
      <section>
        <SearchMovie Query={Query} setQuery={setQuery} />
        <Movies/>
      </section>
    </QueryContext.Provider>
  );
}
