import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet"; //automatically install npm package using parcel
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

//here ANIMALS is just an array of strings
const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA"); //we use className instead of class as class is a reserved keyword
  //location is the current state of location and setLocation is a function that updates location
  /*const [animal, setAnimal] = useState("Dog");
  const [breed, setBreed] = useState("");
  */
  const [breeds, setBreeds] = useState([]); //this is for requesting breed list based on breed selected
  const [animal, AnimalDropdown, setAnimal] = useDropdown(
    "Animal", //the id
    "dog", // default value
    ANIMALS // options
  );
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]); //these are the pets that we will get from the api based on the form input
  const [theme, setTheme] = useContext(ThemeContext); //ThemeContext.provider has to be a parent in order to use useContext
  /*
  async function requestPets() {
    const { animals } = await pet.animals({ location, breed, type: animal });
    setPets(animals); //set pets to animals if received from api or continue being an empty array
    console.log(pets);
  }
  */
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    setPets(animals);
  }
  useEffect(() => {
    //if we do not specify dependecies the page will re render even if we update the loaction
    //and will hence call  the useEffect which is not what we want
    //we only want it to run when the re render for change in animal takes place
    //useEffect schedules to run this function after the render has taken place.
    //this is to not slow down the first render.
    //pet.breeds("dog").then(console.log, console.error); //returns a promise and passes result to console.log if successful else console.error
    setBreeds([]); //clear all the loaded breed options
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]); //once these dependencies have been declared  useEffect will only be called if they are updated
  //if they weren't set every time setBreeds is called state changes an re render occurs so it will run the effect again causing an infinite loop
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          {/*usually you would write a for attribute here in the label but that is a
        reserved keyword in javascript so we htmlFor instead. Same goes for className instead of class*/}
          Location
          {/*<h3>{location}</h3>*/}
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(event) => setLocation(event.target.value)}
          />
          {/* okay so here when you type something in  search it doesnt change anything in the input 
          if you dont add the useState and onChange stuff because your keystrokes are registered as events
          and react re renders all the components on a key change and then sees that the value is Seattle.
          so what we do is that we use the tiny onChange function to update the  the location value
          with whatever the event's target's value was typed.

          <>HOOKS SHOULD NEVER BE MADE INSIDE OF FOR LOOPS OR IF STATEMENTS.<>*/}
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="peru">Peru</option>
            <option value="hotpink">Hot Pink</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
export default SearchParams;
/*
<label htmlFor="animal">
          Animal
          <h3>{animal}</h3>
          <select
            id="animal"
            placeholder="animal"
            value={animal}
            onChange={(event) => setAnimal(event.target.value)}
            onBlur={(event) => setAnimal(event.target.value)}
          >
            {/*creating an option component for every element in the ANIMALS array
            keys are just for detecting changes and preventing unnecessary re rendering
            every component should have a unique key.
            }
            <option>All</option>
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <h3>{breed}</h3>
          <select
            id="breed"
            placeholder="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
            disabled={breeds.length === 0}
          >
            <option>All</option>
            {breeds.map((breedString) => (
              <option key={breedString}>{breedString}</option>
            ))}
          </select>
        </label>
*/
