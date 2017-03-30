"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var CreateZone = (function (Component) {
	function CreateZone() {
		_classCallCheck(this, CreateZone);

		_get(Object.getPrototypeOf(CreateZone.prototype), "constructor", this).call(this);
		this.clearValues = this.clearValues.bind(this);
		this.state = {

			zone: {
				username: ""
			}
		};
	}

	_inherits(CreateZone, Component);

	_prototypeProperties(CreateZone, null, {
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
				this.props.onCreate(updated);
				this.clearValues();
			},
			writable: true,
			configurable: true
		},
		clearValues: {
			value: function clearValues() {
				this.refs.name.value = "";
				this.refs.zip.value - "";
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"div",
					{ className: "card card-primary animated fadeInUp animation-delay-7" },
					React.createElement(
						"div",
						{ className: "card-header" },
						React.createElement(
							"h3",
							{ className: "card-title" },
							React.createElement("i", { className: "zmdi zmdi-widgets" }),
							" Create Neighborhood"
						)
					),
					React.createElement(
						"div",
						{ className: "card-block" },
						React.createElement("input", { style: { width: "75%", fontSize: "1.1em" }, id: "name", placeholder: "Enter Neighborhood Name", ref: "name", onChange: this.updateZone.bind(this), className: "form-control", type: "text", ref: "name" }),
						React.createElement("input", { style: { width: "75%", fontSize: "1.1em" }, placeholder: "Enter Zip Code", id: "zipCode", ref: "zipCode", onChange: this.updateZone.bind(this), className: "form-control", type: "text", ref: "zip" }),
						React.createElement("br", null),
						React.createElement(
							"a",
							{ onClick: this.submitZone.bind(this), href: "javascript:void(0)", className: "btn btn-success btn-raised btn-block" },
							React.createElement("i", { className: "ml-1 no-mr zmdi zmdi-home" }),
							"  Add  New Neighborhood"
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return CreateZone;
})(Component);

module.exports = CreateZone;