import React from "react";
// Router
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Import components
import NavBar from "./views/NavBar.js";
import Home from "./views/Home.js";
import InConstruction from "./Components/InConstruction.js";
import NotFound from "./Components/NotFound.js";
// Import image
import background from "./Asset/Images/background-01.jpg";
// Import CSS
import "./styles.css";

export default function App() {
  return (
    <div className="App" style={{ backgroundImage: "url(" + background + ")" }}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/AboutUs" component={InConstruction} />
          <Route path="/Blog" component={InConstruction} />
          <Route path="/Contact" component={InConstruction} />
          <Route path="/Login" component={InConstruction} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
