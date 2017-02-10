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
var UpdateZone = (function (Component) {
  function UpdateZone(props) {
    _classCallCheck(this, UpdateZone);

    _get(Object.getPrototypeOf(UpdateZone.prototype), "constructor", this).call(this, props);
    this.state = {
      zone: {
        username: "",
        name: "",
        zipCode: ""

      }
    };
  }

  _inherits(UpdateZone, Component);

  _prototypeProperties(UpdateZone, null, {
    componentDidMount: {
      value: function componentDidMount() {
        this.props.fetchZone(null);
        console.log("update zone list: " + JSON.stringify(this.props.list));
        console.log("selected zone: " + JSON.stringify(this.props.selected));
      },
      writable: true,
      configurable: true
    },
    updateZone: {
      value: function updateZone(event) {
        var updated = Object.assign({}, this.state.zone);
        updated[event.target.id] = event.target.value;

        this.setState({
          zone: updated
        });
      },
      writable: true,
      configurable: true
    },
    submitZone: {
      value: function submitZone(event) {
        var updated = Object.assign({}, this.state.zone);
        updated.zipCodes = updated.zipCode.split(",");
        this.setState({
          updated: updated
        });
        this.props.onCreate(updated);

        //make Api call
        console.log("SubmitZone");
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { style: styles.zone.zonedetails },
          React.createElement(
            "h1",
            null,
            "Update Your Zone"
          ),
          React.createElement(
            "div",
            { style: styles.zone.container },
            React.createElement(
              "h2",
              null,
              "Current Zone:"
            ),
            React.createElement(
              "h3",
              null,
              "Zip Code: ",
              React.createElement(
                "span",
                { style: styles.profile.entry },
                this.props.list[this.props.selected].zipCodes
              )
            ),
            React.createElement(
              "h3",
              null,
              "Zone Name: ",
              React.createElement(
                "span",
                { style: styles.profile.entry },
                " ",
                this.props.list[this.props.selected].name
              )
            ),
            React.createElement(
              Link,
              { to: "/" },
              React.createElement(
                "button",
                { style: { marginRight: 10 }, type: "", className: "btn btn-info" },
                "Home"
              )
            )
          ),
          React.createElement(
            "div",
            { style: styles.zone.container },
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(
              "h4",
              null,
              "Update Zone:"
            ),
            React.createElement(
              "label",
              null,
              "Name:"
            ),
            React.createElement("input", { id: "name", onChange: this.updateZone.bind(this), className: "form-control", type: "text", defaultValue: this.props.list[this.props.selected].name }),
            React.createElement("br", null),
            React.createElement(
              "label",
              null,
              "Zip Code:"
            ),
            React.createElement("input", { id: "zipCode", onChange: this.updateZone.bind(this), className: "form-control", type: "text", defaultValue: this.props.list[this.props.selected].zipCodes }),
            React.createElement("br", null),
            React.createElement(
              "button",
              { onClick: this.submitZone.bind(this), className: "btn btn-info" },
              "Update Zone"
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return UpdateZone;
})(Component);

var stateToProps = function (state) {
  return {
    list: state.zone.list,
    selected: state.zone.selectedZone,
    appStatus: state.zone.appStatus };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchZone: function (params) {
      return dispatch(actions.fetchZone(params));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(UpdateZone);
// console.log('Update zone: '+ event.target.id + "- " + event.target.value)