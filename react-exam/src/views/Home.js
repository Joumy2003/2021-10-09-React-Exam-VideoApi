//Import components
import { useState } from "react";
import SearchMoviesBox from "./SearchMoviesBox.js";
import MainContent from "./MainContent";
import { ContentContext } from "../Components/Search/QueryContext";
import "../Asset/Css/home.css";
export default function Home() {
  let [ImdbID, setImdbID] = useState("tt0372784");
  return (
    <div className="home">
      <ContentContext.Provider value={{ ImdbID, setImdbID }}>
        <MainContent />
        <SearchMoviesBox />
      </ContentContext.Provider>
    </div>
  );
}
