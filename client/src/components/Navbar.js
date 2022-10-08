import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const { isUserLogged, setUserState } = useContext(UserContext);
  console.log(isUserLogged());
  const history = useHistory();

  const logout = () => {
    setUserState({ accessToken: "" });
    history.push("/");
  };

  return (
    <div className="navbar">
      <ul className="navlist">
        <li>
          <Link to="/">Home</Link>
        </li>
        {isUserLogged() ? (
          <>
            <li>
              <Link to="/quote-list">Quotes</Link>
            </li>
            <li>
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/log-in">Login</Link>
          </li>
        )}
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
