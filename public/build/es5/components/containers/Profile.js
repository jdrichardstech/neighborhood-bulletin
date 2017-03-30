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
var _presentation = require("../presentation");

var Header = _presentation.Header;
var BackToTop = _presentation.BackToTop;
var Footer = _presentation.Footer;
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
						null,
						React.createElement(
							"div",
							{ className: "ms-hero-page-override ms-hero-img-city ms-bg-fixed ms-hero-bg-primary" },
							React.createElement(
								"div",
								{ className: "container" },
								React.createElement(
									"div",
									{ className: "text-center mt-2", style: { paddingTop: 75 } },
									React.createElement(
										"h1",
										{ className: "color-white mt-4 animated fadeInUp animation-delay-10" },
										"Profile Page"
									),
									React.createElement("img", { src: profile.image, className: "ms-avatar-hero animated zoomIn animation-delay-7" }),
									React.createElement(
										"h1",
										{ className: "color-white mt-4 animated fadeInUp animation-delay-10" },
										profile.username
									),
									React.createElement(
										"h3",
										{ className: "color-medium no-mb animated fadeInUp animation-delay-10" },
										profile.bio
									)
								)
							)
						),
						React.createElement(
							"div",
							{ className: "container" },
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "col-md-12" },
									React.createElement(
										"div",
										{ className: "card-block" },
										React.createElement(
											"h2",
											{ className: "color-primary no-mb", style: { textAlign: "center", padding: "20px 0 20px 0" } },
											"Personal Information"
										)
									),
									React.createElement(
										"table",
										{ className: "table table-no-border table-striped", style: { width: "65%", margin: "0 auto 50px auto" } },
										React.createElement(
											"tbody",
											null,
											React.createElement(
												"tr",
												null,
												React.createElement(
													"th",
													null,
													React.createElement("i", { className: "zmdi zmdi-account mr-1 color-royal" }),
													" User Name"
												),
												React.createElement(
													"td",
													null,
													profile.username
												)
											),
											React.createElement(
												"tr",
												null,
												React.createElement(
													"th",
													null,
													React.createElement("i", { className: "zmdi zmdi-male-female mr-1 color-success" }),
													" Gender"
												),
												React.createElement(
													"td",
													null,
													profile.gender
												)
											),
											React.createElement(
												"tr",
												null,
												React.createElement(
													"th",
													null,
													React.createElement("i", { className: "zmdi zmdi-email mr-1 color-primary" }),
													" Email"
												),
												React.createElement(
													"td",
													null,
													React.createElement(
														"a",
														{ href: "#" },
														profile.username,
														"@me.com"
													)
												)
											),
											React.createElement(
												"tr",
												null,
												React.createElement(
													"th",
													null,
													React.createElement("i", { className: "zmdi zmdi-link mr-1 color-danger" }),
													" Website"
												),
												React.createElement(
													"td",
													null,
													React.createElement(
														"a",
														{ href: "#" },
														"www.",
														profile.username,
														".com"
													)
												)
											)
										)
									),
									React.createElement(
										Link,
										{ to: "/" },
										React.createElement(
											"button",
											{ style: { margin: "0 auto 100px auto", width: "25%" }, type: "", className: "btn btn-success  btn-raised btn-block" },
											React.createElement("i", { className: "ml-1 no-mr zmdi zmdi-home" }),
											"  Home"
										)
									)
								)
							)
						)
					);
				}

				var content = this.props.appStatus == "loading" ? "Loading..." : header;

				return React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "sb-site-container", style: { background: "#fff" } },
						React.createElement(Header, null),
						content
					),
					React.createElement(BackToTop, null),
					React.createElement(Footer, null)
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