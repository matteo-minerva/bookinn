import React, { useContext } from "react";
import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";
import { Context } from "../context";

const Header = () => {
  const { query, getData, handleTextChange, handleRadioChange } = useContext(
    Context
  );

  return (
    <header className="header">
      <div className="header__content container">
        <h3>Explore the library</h3>

        <form className="form" onSubmit={getData}>
          <input
            type="text"
            placeholder="Search..."
            value={query.text}
            //Allows input if entered one or more char that is not whitespace
            pattern="^[^\s]+[-a-zA-Z\s]+([-a-zA-Z]+)*$"
            onChange={handleTextChange}
          />
          <button className="btn-submit" type="submit">
            <IconContext.Provider value={{ className: "btn-submit-icon" }}>
              <BiSearch />
            </IconContext.Provider>
          </button>

          <div className="form__radio-buttons">
            <input
              type="radio"
              name="query"
              id="book"
              value="book"
              checked={query.type === "book"}
              onChange={handleRadioChange}
            />
            <label htmlFor="book">Book</label>

            <input
              type="radio"
              name="query"
              id="author"
              value="author"
              checked={query.type === "author"}
              onChange={handleRadioChange}
            />
            <label htmlFor="author">Author</label>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
