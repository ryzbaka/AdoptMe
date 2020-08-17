import React from "react";

class Carousel extends React.Component {
  //  state = { photos: [], active: 0 };
  /*
  static getDerivedStateFromProps({ media }) {
    //takes in a set of props and gives back a new state

    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    return { photos };
  }
*/
  constructor(props) {
    super(props);
    this.state = { photos: [], active: 0 };
    if (props.media.length) {
      this.state.photos = props.media.map(({ large }) => large);
    }
  }
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img alt="animal" src={photos[active]}></img>
        <div className="carousel-smaller">
          {photos.map((photo, index) => {
            return (
              <img
                key={photo}
                onClick={this.handleIndexClick}
                data-index={index}
                src={photo}
                className={index === active ? "active" : ""}
                alt="animal-thumbnail"
              ></img>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
