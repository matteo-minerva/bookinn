import React, { useContext, useEffect } from "react";
import homeImg from "../images/home-img.svg";
import { Context } from "../context";
import Loading from "../components/Loading";

const Home = () => {
  const { isLoading } = useContext(Context);

  useEffect(() => {
    if (isLoading) document.title = "BookInn // Loading...";
    document.title = `BookInn // Homepage`;
  }, [isLoading]);

  if (isLoading) return <Loading />;
  return (
    <>
      <main className="home container remaining-vh">
        <div className="wrapper">
          <div className="home__image">
            <img src={homeImg} alt="People reading books" />
          </div>
          <div className="home__text">
            <h2>Welcome to BookInn</h2>
            <p>
              This one is a website developed by <strong>Matteo Minerva</strong>{" "}
              as a React project for <em>start2impact</em>.
            </p>
            <p>It has been developed with the following technologies:</p>
            <ul>
              <li>ReactJS</li>
              <li>axios</li>
              <li>html-react-parser</li>
              <li>react-icons</li>
              <li>react-router</li>
              <li>node-sass</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
