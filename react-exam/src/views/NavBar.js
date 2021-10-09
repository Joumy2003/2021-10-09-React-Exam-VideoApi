// Import react and components
import { MenuItems } from "../Components/NavBar/NavBarItems.js";
import { Link } from "react-router-dom";

// Import Logo
import logo from "../Asset/Images/logo.svg";

// Import CSS
import "../Asset/Css/navBar.css";

export default function NavBar() {
  return (
    <nav className="NavBarItems">
      <div className="logo">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          React <span>Project</span>
        </h1>
      </div>
      <div className="MenuIcon"></div>
      <ul>
        {MenuItems.map((element, i) => {
          return (
            <li key={i}>
              <Link className={element.className} to={element.url}>
                {element.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
