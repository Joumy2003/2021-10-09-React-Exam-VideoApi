import React from "react";
// import Hook
import { useContext } from "react";
// Import CSS
import "../../Asset/Css/search.css";
// Import QueryContect Component
import { QueryContext } from "./QueryContext";

const SearchBox = (props) => {
  // Query Hook - useContext

  const { Query, setQuery } = useContext(QueryContext);
  return (
    <form
      className="searchBarContainer"
      onSubmit={(event) => {
        event.preventDefault();
        setQuery(event.target[0].value);
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
