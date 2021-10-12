import React from "react";
// Import CSS
import "../../Asset/Css/movies.css";
// Import hooks
import { useState, useEffect, useContext } from "react";
import { QueryContext, ContentContext, PageContext } from "../Search/QueryContext";
// Import http Client
import axios from "axios";
// Import image
import leftArrow from "../../Asset/Images/LeftArrow.png";


export default function Movies(props) {
  //Hooks
  const [movies, setMovies] = useState([]);
  const {page,setPage} = useContext(PageContext);
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
        console.log("page(s):"+ page);

        // if data exist
        if (result.data.Search)
        {
          // If poster don't exist use no Img icone;
          result.data.Search.forEach(element =>
            {
              if(element.Poster=="N/A")
              {
                element.Poster="https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"
              }
            });

          // Select first element
          result.data.Search[0].ClassName="selectedMovie";
          // Set states
          setImdbID(result.data.Search[0].imdbID)
          setMovies(result.data.Search);
          setTotalPages(Math.ceil(result.data.totalResults/10));
          console.log("total pages: " + totalPages);
          console.log("total pages calcul: " + result.data.totalResults/10);

          // Reset (if) after nothing found
          // Change input css
          document.querySelector(".search").style.border="none";
          // Change Placeholder
          document.querySelector(".search").placeholder="Enter Movie !";
          // Change button css 
          document.querySelector(".button").style.border="none";
        }
        // If nothing found
        if (!result.data.Search)
        {
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

  // Hook - get data each time query update or page change
  useEffect(() => {
    console.log("useEffect ran");
    getData(Query);
  }, [Query, page]);

  
  const ClickHandler = (event) =>
  {
    // Set imdbID -> Focused movie
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

  // Pagehandler
  const pageBack = (event) =>
  {
    // If page > 1 => page--
    if(page > 1)
    {
      setPage((page-1));
    }
    // If page >= 1 => go to last page
    if(page <= 1)
    {
      setPage(totalPages)
      console.log("current Page:" + page)
    }
  }
  // Pagehandler
  const pagefoward = (event) =>
  {
    // If page < last page => page++
    if(page < totalPages)
    {
      setPage((page+1));
    }
    // If page >= last page => go to first page
    if(page >= totalPages)
    {
      setPage(1)
      console.log("current Page:" + page)
    }

  }

  // Display search list result
  return (
    <div className="Container">
    <img src={leftArrow} alt="Arrow go forward" className="goBack" onClick={pageBack}/>
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
