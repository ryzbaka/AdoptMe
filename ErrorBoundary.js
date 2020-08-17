//mostly code from reactjs.org/docs/error-boundaries.html

import React from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends React.Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error ", error, info);
  }

  componentDidUpdate() {
    //called when some update has been made to the component's state or props. Any of them as opposed to useEffect which has dependencies
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          An error ocurred while loading this listing.
          <Link to="/"> Click here </Link> to head back to the homepage.
        </h1>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;

//this component is basically wrapped around the components that you want to catch an error in. If the state has an error then the
//error message is displayed otherwise the children prop is returned.
