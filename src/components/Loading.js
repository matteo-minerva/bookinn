import React from "react";
import loadingBook from "../images/loading-book.gif";

const Loading = () => {
  return (
    <main className="loading remaining-vh">
      <div className="loading-img">
        <img src={loadingBook} alt="Loading..." />
      </div>
    </main>
  );
};

export default Loading;
