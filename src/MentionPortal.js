import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class SimpleMentionPortal extends React.Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    closeOnClick: PropTypes.bool.isRequired,
    closeOnEsc: PropTypes.bool.isRequired
  };

  static defaultProps = {
    closeOnEsc: true,
    closeOnClick: true
  };

  onDocumentClick = e => {
    this.props.closeOnClick && this.props.close();
  };

  onDocumentEsc = event => {
    if (this.props.closeOnEsc && event.keyCode === 27) {
      this.props.close();
    }
  };

  componentDidMount() {
    if (document) {
      document.addEventListener("click", this.onDocumentClick);
      document.addEventListener("keyup", this.onDocumentEsc);
    }
  }

  componentWillUnmount() {
    if (document) {
      document.removeEventListener("click", this.onDocumentClick);
      document.removeEventListener("keyup", this.onDocumentEsc);
    }
  }

  render() {
    return this.props.children;
  }
}

class ReactMentionPortal extends React.Component {
  componentWillMount() {
    this.portal = document.createElement("div");
    document.body.appendChild(this.portal);
  }
  componentWillUnmount() {
    document.body.removeChild(this.portal);
  }
  render() {
    return ReactDOM.createPortal(
      <SimpleMentionPortal {...this.props}>
        {this.props.children}
      </SimpleMentionPortal>,
      this.portal
    );
  }
}

export default SimpleMentionPortal;

export { ReactMentionPortal };
