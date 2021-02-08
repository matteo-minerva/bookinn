import React, { useContext, useEffect } from "react";
import { Context } from "../context";
import errorImg from "../images/error-image.svg";
import { Link } from "react-router-dom";

const Error = () => {
  const { error, history } = useContext(Context);

  useEffect(() => {
    if (error.isError) document.title = `BookInn // ${error.name || "Error"}`;
  }, [error]);

  return (
    <>
      <main className="error remaining-vh container">
        <div className="error__content">
          <div className="error__image">
            <img src={errorImg} alt="Error" />
          </div>

          <div className="error__text">
            <h2>{error.errorName || "Error 404"}</h2>
            <h3>
              {error.errorMessage ||
                "This is a generic error page, use the search bar to access the library"}
            </h3>

            <div className="error__link ">
              <Link
                className="cta cta-back-home"
                to="/"
                onClick={() => history.push("/")}
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Error;
