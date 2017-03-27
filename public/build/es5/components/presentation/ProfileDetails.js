"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var Link = require("react-router").Link;
var styles = _interopRequire(require("./styles"));




var ProfileDetails = function (props) {
  return React.createElement(
    "div",
    { style: styles.profile.profiledetails },
    React.createElement(
      "h1",
      null,
      "User Profile:"
    ),
    React.createElement(
      "h3",
      null,
      "Username:  ",
      React.createElement(
        "span",
        { style: styles.profile.entry },
        props.username
      )
    ),
    React.createElement(
      "h3",
      null,
      "Image: ",
      React.createElement("img", { src: props.image })
    ),
    React.createElement(
      "h4",
      null,
      "Gender: ",
      React.createElement(
        "span",
        { style: styles.profile.entry },
        " ",
        props.gender
      ),
      " "
    ),
    React.createElement(
      "h4",
      null,
      "City: ",
      React.createElement(
        "span",
        { style: styles.profile.entry },
        " ",
        props.city
      )
    ),
    React.createElement(
      "h4",
      null,
      "Bio: ",
      props.bio
    ),
    React.createElement(
      Link,
      { to: "/" },
      React.createElement(
        "button",
        { type: "", className: "btn btn-info" },
        "Back"
      )
    )
  );
};

module.exports = ProfileDetails;