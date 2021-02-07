import React from "react";
import homeImg from "../images/home-img.svg";

const Home = () => {
  //TODO AGGIUNGI QUALCOSA UOMO
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
            <p>
              It has been developed with the following technologies:
              <ul>
                <li>ReactJS</li>
                <li>axios</li>
                <li>html-react-parser</li>
                <li>react-icons</li>
                <li>react-router</li>
                <li>node-sass</li>
              </ul>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
