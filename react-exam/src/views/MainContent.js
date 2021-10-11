import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { ContentContext,QueryContext } from "../Components/Search/QueryContext";
import "../Asset/Css/mainContent.css";
export default function MainContent() {
  // Movie Hook
  const [FocusedMovies, setFocusedMovie] = useState([]);
  const { ImdbID, setImdbID } = useContext(ContentContext);
  const { Query, setQuery } = useContext(QueryContext);
  // Api request
  const getData = async (ImdbID) => {
    const movieResponse = await axios
      .get("https://omdbapi.com/?i=" + ImdbID + "&apikey=8c23acbc&plot=full")
      .then((result) => {
        console.log("FocusedContent result: " + result.data.Title);
        console.log("ImbdID " + ImdbID);
        console.log("focused result below ");
        console.log(result.data);
         // If poster don't exist use no Img icone;
          
         if(result.data.Poster=="N/A")
         {
           result.data.Poster="https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"
         }
        setFocusedMovie(result.data);

         
          });
      
  };

  // Hook
  useEffect(() => {
    console.log("useEffect getData(ImdbID) ran");
    getData(ImdbID);
  }, [ImdbID]);

  return (
    <main>
      <div className="poster">
        <img src={FocusedMovies.Poster} alt="poster" />
      </div>
      <div className="content">
        <h2>{FocusedMovies.Title}</h2>
        <div className="firstInfo">
          <p>{FocusedMovies.Year}</p>
          <p>{FocusedMovies.Rated}</p>
          <p>{FocusedMovies.Released}</p>
          <p>{FocusedMovies.Runtime}</p>
          <p>{FocusedMovies.BoxOffice}</p>
          <p>{FocusedMovies.Genre}</p>
        </div>
        <div>
          <p className="plot">
            Plot :<br></br>
            {FocusedMovies.Plot}
          </p>
          <p> Cast : {FocusedMovies.Actors}</p>
          <p>Director : {FocusedMovies.Director}</p>
          <p>Writers : {FocusedMovies.Writer}</p>
          <p>Awards : {FocusedMovies.Awards}</p>
          <p>Website: {FocusedMovies.Website}</p>
          <div className="footerContent">
            <p>{FocusedMovies.Country}</p>
            <p>{FocusedMovies.Type}</p>
            <p>{FocusedMovies.Language}</p>
            <p>{FocusedMovies.Metascore}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
