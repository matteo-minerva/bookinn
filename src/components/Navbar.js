import React from "react";
import logo from "../images/open-book.svg";

const Navbar = () => {
  return (
    <nav className="navbar container">
      <div className="navbar__logo">
        <img src={logo} alt="BookInn logo" />
        <h1>BookInn</h1>
      </div>
    </nav>
  );
};

export default Navbar;
