import React, { Component } from "react";
// import * as Sentry from "@sentry/react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.reload.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Sentry.captureException(error);
  }

  reload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ui middle aligned center aligned grid error-boundary">
          <div className="four wide middle aligned column bg-white padding-lg">
            <p className="text-size-bigger margin-no padding-lg-top">Oop!</p>
            <div className="text-size-large">
              Something went wrong. Try Again.
              <div
                className="text-color-positive cursor-pointer margin-top-twenty text-size-sixteen"
                onClick={this.reload}>
                Click here to Reload.
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
