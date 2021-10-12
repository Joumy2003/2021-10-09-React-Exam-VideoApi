// Import React and Hooks
import React, { useState } from "react";
import { QueryContext, PageContext } from "../Components/Search/QueryContext.js";
// Import components
import SearchMovie from "../Components/Search/SearchMovie.js";
import Movies from "../Components/Movies/MovieList.js";


export default function SearchMoviesBox() {
  //Query with default movies
  let [Query, setQuery] = useState("Batman");
  let [page, setPage] = useState(1);

  return (
    <QueryContext.Provider value={{ Query, setQuery }}>
    <PageContext.Provider value={{ page, setPage }}>
      <section>
        <SearchMovie Query={Query} setQuery={setQuery} />
        <Movies/>
      </section>
      </PageContext.Provider>
    </QueryContext.Provider>
  );
}
