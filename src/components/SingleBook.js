import React, { useContext, useEffect } from "react";
import { Context } from "../context";
import parse from "html-react-parser";
import { IconContext } from "react-icons";
import { FaGooglePlay } from "react-icons/fa";
import Error from "../pages/Error";
import Loading from "../components/Loading";

const SingleBook = () => {
  const { singleBook, setSingleBook, isLoading, history } = useContext(Context);

  //Sets page title
  useEffect(() => {
    if (isLoading) document.title = "BookInn // Loading...";
    if (singleBook) document.title = `BookInn // ${singleBook.title}`;
    if (history.location.pathname !== `/book/${singleBook.id}`)
      document.title = "BookInn // Error";
  }, [singleBook, isLoading, history.location.pathname]);

  //If you refresh on a page you already loaded, content will be desplayed
  useEffect(() => {
    const tempSingleBook = JSON.parse(localStorage.getItem("single-book"));
    setSingleBook(tempSingleBook);
  }, [setSingleBook]);

  if (isLoading) {
    return <Loading />;
  }

  if (
    Object.keys(singleBook).length !== 0 &&
    history.location.pathname === `/book/${singleBook.id}`
  ) {
    return (
      <div className="book container">
        <div className="wrapper">
          <div
            className="book__cover col"
            style={{ backgroundImage: `url(${singleBook.cover})` }}
          ></div>

          <div className="book__info col">
            <h2>{singleBook.title}</h2>
            <h4>
              a novel by <em>{singleBook.authors}</em>
            </h4>
            <div className="divider"></div>
            {singleBook.publisher ? (
              <span>
                <strong>Publisher: </strong>
                {singleBook.publisher}
              </span>
            ) : null}

            {singleBook.publishedDate ? (
              <span>
                <strong>Release year: </strong>
                {singleBook.publishedDate}
              </span>
            ) : null}

            {singleBook.language ? (
              <span>
                <strong>Language: </strong>
                {singleBook.language}
              </span>
            ) : null}

            {singleBook.pageCount ? (
              <span>
                <strong>N. pages: </strong>
                {singleBook.pageCount}
              </span>
            ) : null}

            <div className="cta-group">
              <a
                href={singleBook.isForSale ? singleBook.saleLink : null}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div
                  className={
                    singleBook.isForSale
                      ? "cta cta-group__cart"
                      : "cta-group__cart"
                  }
                  style={
                    singleBook.isForSale
                      ? { cursor: "pointer" }
                      : notAllowedStyle
                  }
                >
                  <IconContext.Provider value={{ className: "cart" }}>
                    <FaGooglePlay />
                  </IconContext.Provider>
                  get it
                </div>
              </a>
              <div className="cta cta-group__love"></div>
            </div>
          </div>
        </div>

        <div className="book__synopsis">
          <h4>Synopsis</h4>
          <p>{parse(singleBook.description)}</p>
        </div>
      </div>
    );
  }

  return <Error />;
};

//Styling for when the book isn't available in the shop
const notAllowedStyle = {
  cursor: "not-allowed",
  backgroundColor: "#c4c4c4",
  color: `white`,
  boxShadow: "none",
};

export default SingleBook;
