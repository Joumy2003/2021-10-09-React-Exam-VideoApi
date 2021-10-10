import React from "react";
import "../../Asset/Css/movies.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { QueryContext, ContentContext } from "../Search/QueryContext";
import leftArrow from "../../Asset/Images/LeftArrow.png";
export default function Movies(props) {
  //Hooks
  const [movies, setMovies] = useState([]);
  const [page,setPage] = useState(1)
  const [totalPages, setTotalPages] = useState();
  const { Query, setQuery } = useContext(QueryContext);
  const { ImdbID, setImdbID } = useContext(ContentContext);
  // Api request
  const getData = async (Query) => {
    
    const response = await axios
      .get("https://omdbapi.com/?s=" + Query + "&apikey=8c23acbc" + "&page=" + page)
      .then((result) => {
        console.log(result.data.Search);
        console.log("Movie query is : " + Query);
        console.log(result);
        console.log(result.data.totalResults)
        setTotalPages(Math.ceil(result.data.totalResults/10));
        console.log(totalPages);
        console.log("page(s):"+ page);
        
        // if ok
        if (result.data.Search) {
          // First element is selected
          result.data.Search[0].ClassName="selectedMovie";
          setImdbID(result.data.Search[0].imdbID)
          setMovies(result.data.Search);

          //reset (if) after nothing found
          // Change input css
          document.querySelector(".search").style.border="none";
          // Change Placeholder
          document.querySelector(".search").placeholder="Enter Movie !";
          // Change button css 
          document.querySelector(".button").style.border="none";
        }
        // If nothing found
        if (!result.data.Search) {
          
          // Change input css
          document.querySelector(".search").style.borderTop="2px solid red";
          document.querySelector(".search").style.borderLeft="2px solid red";
          document.querySelector(".search").style.borderBottom="2px solid red";
          // Change Placeholder
          document.querySelector(".search").placeholder="Sorry Nothing Found!";
          // Change button css 
          document.querySelector(".button").style.borderBottom="2px solid red";
          document.querySelector(".button").style.borderRight="2px solid red";
          document.querySelector(".button").style.borderTop="2px solid red";


        }
      });
  };

  // Hook
  useEffect(() => {
    console.log("useEffect ran");
    getData(Query);
  }, [Query, page]);

   // Hook
   useEffect(() => {
    console.log("useEffect ran");
    setPage(1);
  }, [Query]);



  // Set imdbID 
  const ClickHandler = (event) => {
    setImdbID(event.target.title);
    let grpContainer = event.target.parentElement.parentElement;
    console.log(event.target.parentElement.parentElement);

    // Reset not selected movies
    for(let j=0;j<grpContainer.childNodes.length;j++)
    {
        grpContainer.childNodes[j].firstChild.className="img";
    }

    // Change css of clicked item
    event.target.className="selectedMovie";
    console.log(event.target);
  };


  const pageHandler = (event) =>
  {
    setPage(page-1);
    if(page == 0)
    {
      setPage(totalPages)
    }
  }
  const pagefoward = (event) =>
  {
    setPage(page+1);
    if(page > totalPages-1)
    {
      setPage(1)
    }
  }

  // Display search list result
  return (
    <div className="Container">
    <img src={leftArrow} alt="Arrow go forward" className="goBack" onClick={pageHandler}/>
    <div className="MovieContainer">
    
      {movies.map(({ Poster, Title, imdbID, ClassName }) => (
        <div key={imdbID} className="Movie">
          <img 
            src={Poster}
            alt="movie"
            title={imdbID}
            onClick={ClickHandler}
            className={ClassName}
          ></img>
          <h3 className="title">{Title}</h3>
        </div>
      ))}
    </div>
    <img src={leftArrow} alt="Arrow go forward" className="goFoward" onClick={pagefoward}/>
    </div>
  );
}
