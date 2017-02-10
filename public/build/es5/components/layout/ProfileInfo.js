"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Profile = require("../containers/").Profile;
var ProfileInfo = (function (Component) {
  function ProfileInfo() {
    _classCallCheck(this, ProfileInfo);

    if (Component != null) {
      Component.apply(this, arguments);
    }
  }

  _inherits(ProfileInfo, Component);

  _prototypeProperties(ProfileInfo, null, {
    componentDidMount: {
      value: function componentDidMount() {
        console.log("Profile componentDidMount: " + JSON.stringify(this.props.params));
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            null,
            React.createElement(Profile, { username: this.props.params.username })
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return ProfileInfo;
})(Component);

module.exports = ProfileInfo;