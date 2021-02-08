import React, { useContext, useEffect } from "react";
import { Context } from "../context";
import { Link } from "react-router-dom";
import defaultCover from "../images/default-cover.png";
import Loading from "../components/Loading";
import Error from "../pages/Error";

const Query = () => {
  const { results, queryTitle, getSpecificBook, isLoading } = useContext(
    Context
  );

  useEffect(() => {
    if (isLoading) document.title = "BookInn // Loading...";
    if (queryTitle)
      document.title = `BookInn // ${
        `Results matching "${queryTitle}"` || "No items found"
      }`;
    else document.title = "BookInn // Error";
  }, [queryTitle, isLoading]);

  let books = results.map((item) => {
    //Checks if the book has a cover, otherwise a default one will be applied
    let imageSrc = item.volumeInfo.hasOwnProperty("imageLinks")
      ? item.volumeInfo.imageLinks.thumbnail
      : defaultCover;

    //Sets up an obj that's easier to read
    return {
      id: item.id,
      self: item.selfLink,
      title:
        item.volumeInfo.title.length > 25
          ? item.volumeInfo.title.slice(0, 25) + "..."
          : item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      language: item.volumeInfo.language,
      cover: imageSrc,
    };
  });

  if (isLoading) {
    return <Loading />;
  }

  if (results.length !== 0) {
    return (
      <main className="container">
        {/* Query title */}
        {queryTitle && (
          <h3
            style={{ display: "block", maxWidth: "1200px", margin: "0 auto" }}
          >
            Results matching "{queryTitle}"
          </h3>
        )}

        {/* List of books matching the input */}
        <div className="results">
          {books.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="col"
              onClick={() => getSpecificBook(book.self)}
            >
              <div>
                <div
                  style={{ backgroundImage: `url(${book.cover})` }}
                  className="cover"
                >
                  <div className="cover__info">{book.language}</div>
                </div>

                <h4>{book.title || "N/A"}</h4>
                <small>by {book.authors || "Unknow author"}</small>
              </div>
            </Link>
          ))}
        </div>
      </main>
    );
  }
  return <Error />;
};

export default Query;
