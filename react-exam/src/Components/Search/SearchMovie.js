import React from "react";
// import Hook
import { useContext } from "react";
// Import CSS
import "../../Asset/Css/search.css";
// Import QueryContect Component
import { QueryContext, PageContext } from "./QueryContext";

const SearchBox = (props) => {
  // Hook - useContext
  const { Query, setQuery } = useContext(QueryContext);
  const { page, setPage } = useContext(PageContext);


  return (
    <form
      className="searchBarContainer"
      onSubmit={(event) => {
        event.preventDefault();
        // Get Query
        setQuery(event.target[0].value);
        setPage(1);
        // Empty input
        event.target[0].value="";
        console.log("onSubmit query is : " + Query);
      }}
    >
      <input
        className="search"
        id="Search"
        type="text"
        placeholder="Enter movie"
        value={props.value}
      ></input>
      <input className="button" type="submit" value="Search"></input>
    </form>
  );
};

export default SearchBox;
