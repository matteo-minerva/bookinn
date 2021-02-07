import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import defaultCover from "./images/default-cover.png";

const Context = React.createContext();

const ContextProvider = (props) => {
  let url = "https://www.googleapis.com/books/v1/volumes?q=";
  const [query, setQuery] = useState({ text: "", type: "book" });
  const [queryTitle, setQueryTitle] = useState("");
  const [results, setResults] = useState([]);
  const [singleBook, setSingleBook] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    errorName: "",
    errorMessage: "",
  });
  const history = useHistory();

  //Form text input
  const handleTextChange = (event) => {
    const { value } = event.target;

    setQuery({
      ...query,
      text: value,
    });
  };

  //Radio button input
  const handleRadioChange = (event) => {
    setQuery({
      ...query,
      type: event.target.value,
    });
  };

  //Fetches data once the form is submitted
  const getData = (event) => {
    const MAX_RESULTS = 20;

    event.preventDefault();
    setError({ ...error, isError: false });
    setIsLoading(true);
    setQueryTitle(query.text);

    //Creates URL
    if (query.type === "author") url += `inauthor:`;
    url += `${query.text.replace(" ", "+")}&maxResults=${MAX_RESULTS}`;

    //Actual request
    axios
      .get(url)
      .then((response) => {
        const { items } = response.data;
        setIsLoading(false);
        if (response.data.totalItems === 0) {
          setError({
            ...error,
            isError: true,
            errorName: "no items to show",
            errorMessage: "Please try searching for something else",
          });
          history.push("/error");
        } else {
          setResults(items);
          history.push(`/search/${query.text.replace(" ", "+")}`);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError({
          ...error,
          isError: true,
          errorName: err.name,
          errorMessage: err.message,
        });
        history.push("/error");
      });

    setQuery({ text: "", type: "book" });
  };

  const getSpecificBook = (self) => {
    setIsLoading(true);

    axios
      .get(self)
      .then((response) => {
        const book = response.data;
        /*When length is == 0 it means there's no info available*/
        setSingleBook({
          id: book.id,
          isForSale: book.saleInfo.saleability === "FOR_SALE" ? true : false,
          saleLink:
            book.saleInfo.saleability === "FOR_SALE"
              ? book.saleInfo.buyLink
              : null,
          title: book.volumeInfo.title || "N/A",
          language: book.volumeInfo.language || "N/A",
          pageCount: book.volumeInfo.pageCount || "Unknown nr. of pages",
          authors: book.volumeInfo.authors || "Unknown author(s)",
          publisher: book.volumeInfo.publisher || "N/A",
          publishedDate: book.volumeInfo.publishedDate
            ? book.volumeInfo.publishedDate.slice(0, 4)
            : "N/A",
          description:
            book.volumeInfo.description || "There's no synopsis available",
          cover: book.volumeInfo.hasOwnProperty("imageLinks")
            ? book.volumeInfo.imageLinks.hasOwnProperty("small")
              ? book.volumeInfo.imageLinks.small
              : defaultCover
            : defaultCover,
        });
        setIsLoading(false);
        history.push(`/book/${book.id}`);
      })
      .catch((err) => {
        setSingleBook({});
        console.log(err);
        setIsLoading(false);
        setError({ ...error, errorName: err.name, errorMessage: err.message });
        history.push("/error");
      });
  };

  return (
    <Context.Provider
      value={{
        isLoading,
        error,
        singleBook,
        history,
        query,
        queryTitle,
        results,
        setResults,
        handleTextChange,
        handleRadioChange,
        getData,
        getSpecificBook,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
