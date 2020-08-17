import React from "react";
import Pet from "./Pet";

const Results = ({ pets }) => {
  //detructuring props to get Pet
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found!</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              key={pet.id}
              animal={pet.type}
              name={pet.name}
              breed={pet.breeds.primary}
              id={pet.id}
              location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
              media={pet.photos}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
