import React, { useContext } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { Context } from "../context";

const Navbar = () => {
  const { history } = useContext(Context);

  return (
    <nav className="navbar container">
      <Link to="/" className="navbar__logo" onClick={() => history.push("/")}>
        <img src={logo} alt="BookInn logo" />
        <h1>BookInn</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
