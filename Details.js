import React from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import { modal } from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends React.Component {
  //inheritance

  /*constructor(props) {
    super(props);
    this.state = {
      //initial state
      loading: true,
    };
  }*/
  state = { loading: true }; //this works fine too.

  componentDidMount() {
    //throw new Error("lol"); //~~> you can use this for testing the error boundary...lol.
    //part of component lifecycle
    //runs once when the component is created.
    //usually used for API requests.
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city} ,${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
        showModal: false,
      });
    });
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => navigate(this.state.url);
  render() {
    if (this.state.loading) {
      return (
        <div>
          <h2>LOADING</h2>
        </div>
      );
    } else {
      const {
        name,
        animal,
        location,
        description,
        media,
        breed,
        showModal,
      } = this.state;
      return (
        <div className="details">
          <Carousel media={media} />
          <div>
            <h1>{name}</h1>
            <h2>{`${animal}-${breed}-${location}`}</h2>
            <p>{description}</p>
            <ThemeContext.Consumer>
              {(themeHook) => (
                <button
                  onClick={this.toggleModal}
                  style={{ backgroundColor: themeHook[0] }}
                >
                  {/* themeHook[0] is the state and themeHook[1] is the updater */}{" "}
                  Adopt {name}!
                </button>
              )}
            </ThemeContext.Consumer>
            <div>
              {this.showModal ? (
                <Modal>
                  <h1> Would you like to adopt {name}?</h1>
                  <div className>
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>
                      No, I'm a monster.
                    </button>
                  </div>
                </Modal>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
  } //every class component needs to have a render method
}
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

/*
  <Details {...props}/> is the same as <Details id = {this.props.id}/> and so on...
*/
