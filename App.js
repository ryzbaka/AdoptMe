//Your React code goes here ... for now.
import React, { StrictMode, useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Pet from "./Pet";
import SearchParams from "./searchParams";
import Details from "./Details";
import TestComponent from "./TestComponent";
import ThemeContext from "./ThemeContext";

const App = () => {
  const themeHook = useState("darkblue"); //returns the state and a function for updating the state as an array.
  /*return React.createElement(
    "div", // what kind of tag (composite or vanilla html tag)
    {}, // attributes, example : { id:" something-important" }
    [
      React.createElement("h1", {}, ["Adopt Me!"]),
      React.createElement(
        Pet,
        { name: "Bucky", animal: "Parrot", breed: "African Grey" },
        []
      ),
      React.createElement(
        Pet,
        { name: "Caeser", animal: "Cat", breed: "Persian" },
        []
      ),
      React.createElement(
        Pet,
        { name: "Donatello", animal: "Turtle", breed: "Generic" },
        []
      ),
    ] //children
  );*/
  return (
    <div>
      <StrictMode>
        <ThemeContext.Provider value={themeHook}>
          {/* this how you comment in jsx */}
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          {/*<SearchParams />*/}
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
            <TestComponent path="/test/:somevalue" />
          </Router>
          {/*<Pet name="Luna" animal="Dog" breed="Havanese" />
        <Pet name="Pepper" animal="Bird" breed="Cockatiel" />
        <Pet name="Doink" animal="Cat" breed="Mixed" />*/}
        </ThemeContext.Provider>
      </StrictMode>
      {/*all strict mode does is raise warnings if you're using something that is going to be deprecated */}
    </div>
  );
}; //Here we have created our own React component ( can be thought of a rubber stamp ) which is a div called App and within we have created
//another stamp which is an h1

render(
  <App />,
  //React.createElement(App, {}, []), //this is going to stamp our App element
  document.getElementById("root") // location is the "root" div so when we render, it will overwrite anything in that div.
); //stamping our component
