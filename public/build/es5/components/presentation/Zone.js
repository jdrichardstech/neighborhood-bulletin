"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var styles = _interopRequire(require("./styles"));

var Link = require("react-router").Link;
var Zone = (function (Component) {
	function Zone() {
		_classCallCheck(this, Zone);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(Zone, Component);

	_prototypeProperties(Zone, null, {
		onSelectTitle: {
			value: function onSelectTitle(event) {
				event.preventDefault();
				// console.log('onSelectTitle: '+this.props.index)
				this.props.select(this.props.index);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var zoneStyle = styles.zone;
				var zipCode = this.props.currentZone.zipCodes[0];

				var activeZone = this.props.isSelected ? React.createElement(
					"a",
					{ style: { fontSize: "1.2em", color: "#ff9800" }, onClick: this.onSelectTitle.bind(this), href: "javascript:void(0)", className: "media-heading" },
					this.props.currentZone.name
				) : React.createElement(
					"a",
					{ style: { fontSize: "1.2em" }, onClick: this.onSelectTitle.bind(this), href: "javascript:void(0)", className: "media-heading" },
					this.props.currentZone.name
				);

				var button = this.props.currentZone.username == this.props.username ? React.createElement(
					Link,
					{ to: "/updatezone/" + this.props.currentZone._id },
					" ",
					React.createElement(
						"button",
						{ style: { marginTop: 10 }, className: "btn btn-warning" },
						"Update Zone"
					)
				) : null;
				return React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "media" },
						React.createElement(
							"div",
							{ className: "media-left media-middle" },
							React.createElement(
								"a",
								{ onClick: this.onSelectTitle.bind(this), href: "#" },
								React.createElement("img", { className: "media-object media-object-circle", src: "/images/zonePin1.jpg", alt: "..." }),
								" "
							)
						),
						React.createElement(
							"div",
							{ className: "media-body", style: { padding: "20px 0 0 10px" } },
							activeZone,
							React.createElement(
								"p",
								null,
								this.props.currentZone.description
							),
							React.createElement(
								"div",
								{ className: "media-footer text-medium" },
								React.createElement(
									"span",
									{ className: "mr-1" },
									React.createElement("i", { className: "zmdi zmdi-city-alt color-default mr-05" }),
									" ",
									zipCode
								)
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Zone;
})(Component);

module.exports = Zone;
/*	<span className="detail">{this.props.currentZone.username}</span><br />*/