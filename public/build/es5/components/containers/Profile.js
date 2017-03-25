"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var APIManager = require("../../utils").APIManager;
var styles = _interopRequire(require("./styles"));

var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Link = require("react-router").Link;
var Profile = (function (Component) {
  function Profile(props) {
    _classCallCheck(this, Profile);

    _get(Object.getPrototypeOf(Profile.prototype), "constructor", this).call(this, props);
    this.state = {};
  }

  _inherits(Profile, Component);

  _prototypeProperties(Profile, null, {
    componentDidMount: {
      value: function componentDidMount() {
        console.log(JSON.stringify(this.props.username));
        var profile = this.props.profiles[this.props.username];
        if (profile != null) {
          return;
        }this.props.fetchProfile({ username: this.props.username });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var profile = this.props.profiles[this.props.username];

        var header = null;
        if (profile != null) {
          header = React.createElement(
            "div",
            { style: { background: "#fff", padding: 15 } },
            React.createElement(
              "h1",
              null,
              "Profile Details:"
            ),
            React.createElement(
              "h3",
              null,
              "User: ",
              React.createElement(
                "span",
                { style: styles.profile.entry },
                " ",
                profile.username
              )
            ),
            React.createElement("img", { src: profile.image }),
            React.createElement("br", null),
            React.createElement(
              "p",
              null,
              "Gender: ",
              React.createElement(
                "span",
                { style: styles.profile.entry },
                profile.gender
              ),
              React.createElement("br", null),
              "City:",
              React.createElement(
                "span",
                { style: styles.profile.entry },
                " ",
                profile.city
              ),
              React.createElement("br", null),
              React.createElement("br", null),
              React.createElement(
                Link,
                { to: "/" },
                React.createElement(
                  "button",
                  { style: { marginRight: 15 }, type: "", className: "btn btn-info" },
                  "Home"
                )
              )
            )
          );
        }

        var content = this.props.appStatus == "loading" ? "Loading..." : header;

        return React.createElement(
          "div",
          { style: styles.profile.profiledetails },
          content
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Profile;
})(Component);

var stateToProps = function (state) {
  return {
    profiles: state.profile.map,
    appStatus: state.profile.appStatus
  };
};



var dispatchToProps = function (dispatch) {
  return {
    fetchProfile: function (params) {
      return dispatch(actions.fetchProfile(params));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Profile);