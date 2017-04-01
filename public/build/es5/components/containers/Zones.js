"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _presentation = require("../presentation");

var CreateZone = _presentation.CreateZone;
var Zone = _presentation.Zone;
var styles = _interopRequire(require("./styles"));

var APIManager = require("../../utils").APIManager;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var store = _interopRequire(require("../../stores/store"));

var Zones = (function (Component) {
	function Zones() {
		_classCallCheck(this, Zones);

		_get(Object.getPrototypeOf(Zones.prototype), "constructor", this).call(this);
		this.state = {};
	}

	_inherits(Zones, Component);

	_prototypeProperties(Zones, null, {
		componentDidMount: {
			value: function componentDidMount() {
				// console.log('componentDidMount: '+JSON.stringify(this.props.user))
				this.props.fetchZone(null);
			},
			writable: true,
			configurable: true
		},
		addZone: {
			value: function addZone(zone) {
				var _this = this;
				if (this.props.user == null) {
					swal({
						title: "Error!",
						text: "No Zone Entered",
						type: "error"
					});
					return;
				}

				var updatedZone = Object.assign({}, zone);
				updatedZone.username = this.props.user.username;
				console.log("user: " + JSON.stringify(updatedZone));

				APIManager.post("/api/zone", updatedZone, function (err, response) {
					if (err) {
						swal({
							title: "Error!",
							text: err.message,
							type: "error"
						});
						return;
					}

					_this.props.zoneCreated(response.result);
				});
			},
			writable: true,
			configurable: true
		},
		selectZone: {
			value: function selectZone(index) {
				// console.log('selectZone: '+index)
				// console.log('Hi current user: '+ this.props.user.username)
				// console.log('Hi zone user: '+ this.props.list[this.props.selected].username)
				this.props.selectZone(index);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var _this = this;


				var header = null;
				var listItems = null;

				if (this.props.user != null) {
					listItems = this.props.list.map(function (zone, i) {
						var selected = i == _this.props.selected;
						return React.createElement(
							"li",
							{ style: { marginTop: 15 }, role: "presentation", key: i },
							React.createElement(Zone, { index: i, username: _this.props.user.username, select: _this.selectZone.bind(_this), isSelected: selected, currentZone: zone })
						);
					});


					// let update = (this.props.user.username == this.props.list[this.props.selected].username) ? "Button" : "NoButton"
					header = React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							null,
							React.createElement(
								"div",
								{ className: "card card-primary animated fadeInUp animation-delay-7" },
								React.createElement(
									"div",
									{ className: "card-header" },
									React.createElement(
										"h3",
										{ className: "card-title" },
										React.createElement("i", { className: "zmdi zmdi-apps" }),
										" Neighborhoods"
									)
								),
								React.createElement(
									"div",
									{ className: "tab-content" },
									React.createElement(
										"div",
										{ role: "tabpanel", className: "tab-pane fade active in", id: "favorite" },
										React.createElement(
											"div",
											{ className: "card-block" },
											React.createElement(
												"h4",
												null,
												"Select Neighborhood to view comments"
											),
											React.createElement(
												"div",
												{ className: "ms-media-list" },
												React.createElement(
													"ul",
													{ style: { listStyle: "none" } },
													listItems
												)
											)
										)
									)
								)
							)
						),
						React.createElement(
							"div",
							{ style: { background: "white" } },
							React.createElement(CreateZone, { onCreate: this.addZone.bind(this) })
						)
					);
				} else {
					header = React.createElement("div", null);
				}

				var content = this.props.appStatus == "loading" ? "Loading..." : header;

				return React.createElement(
					"div",
					null,
					content
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Zones;
})(Component);

var stateToProps = function (state) {
	return {
		list: state.zone.list,
		selected: state.zone.selectedZone,
		appStatus: state.zone.appStatus,
		user: state.account.user
	};
};

var dispatchToProps = function (dispatch) {
	return {
		fetchZone: function (params) {
			return dispatch(actions.fetchZone(params));
		},
		// zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
		zoneCreated: function (zone) {
			return dispatch(actions.zoneCreated(zone));
		},
		createZone: function (params) {
			return dispatch(actions.createZone(params));
		},
		selectZone: function (index) {
			return dispatch(actions.selectZone(index));
		} };
};

module.exports = connect(stateToProps, dispatchToProps)(Zones);
// this.props.createZone(updatedZone)