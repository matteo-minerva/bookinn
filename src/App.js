import React from "react";
import "./scss/App.scss";
import Home from "./pages/Home";
import Query from "./components/Query";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SingleBook from "./components/SingleBook";
import Error from "./pages/Error";
import { Switch, Route } from "react-router-dom";
import { ContextProvider } from "./context";

function App() {
  return (
    <>
      <ContextProvider>
        <Navbar />
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/search/:query">
            <Query />
          </Route>

          <Route path="/book/:id">
            <SingleBook />
          </Route>

          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </ContextProvider>
    </>
  );
}

export default App;
