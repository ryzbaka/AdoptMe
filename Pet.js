import React from "react";
import { Link } from "@reach/router";
/*
export const Pet = ({ name, animal, breed }) => {
  //here I am destructuring the props you can also write props and then use props.animal,props.name,etc
  return React.createElement("div", {}, [
    React.createElement("h1", {}, [name]),
    React.createElement("h2", {}, [animal]),
    React.createElement("h2", {}, [breed]),
  ]);
    IN THIS CASE YOU WOULD HAVE DONE import { Pet } from './Pet.js'
};*/
export default function Pet({ id, name, animal, breed, location, media }) {
  /*return React.createElement("div", {}, [
    React.createElement("h1", {}, [name]),
    React.createElement("h2", {}, [animal]),
    React.createElement("h2", {}, [breed]),
  ]);*/
  //the curly braces basically show that whatever is in it is a javascript expression like
  let photo = "http://placecorgi.com/300/300";
  if (media.length) {
    photo = media[0].small;
  }
  return (
    <Link to={`details/${id}`} className="pet">
      <div className="image-container">
        <img src={photo} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h3>{`${animal} ${breed} - ${location}`}</h3>
      </div>
    </Link>
  ); //this is just jsx that gets co nverted to react.create element calls by BABEL
  // which is included in parcel
}
//In this case you simply do import Pet from './Pet.js'
