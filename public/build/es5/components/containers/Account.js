"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var PropTypes = _react.PropTypes;
var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var connect = require("react-redux").connect;
var styles = _interopRequire(require("./styles"));

var actions = _interopRequire(require("../../actions/actions"));

var store = _interopRequire(require("../../stores/store"));

var Link = require("react-router").Link;
var DropZone = _interopRequire(require("react-dropzone"));

var sha1 = _interopRequire(require("sha1"));

// import { Zones, Comments } from '../containers'
var Zones = _interopRequire(require("../containers/Zones"));

var Comments = _interopRequire(require("../containers/Comments"));

var _presentation = require("../presentation");

var Header = _presentation.Header;
var Footer = _presentation.Footer;
var BackToTop = _presentation.BackToTop;
var Account = (function (Component) {
	function Account(props) {
		_classCallCheck(this, Account);

		_get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this, props);
		this.clearValues = this.clearValues.bind(this);
		this.state = {
			user: null,
			username: "",
			password: "",
			flag: true
		};
	}

	_inherits(Account, Component);

	_prototypeProperties(Account, null, {
		componentDidMount: {
			value: function componentDidMount() {},
			writable: true,
			configurable: true
		},
		componentDidUpdate: {
			value: function componentDidUpdate() {
				console.log("componentDidUpdate" + JSON.stringify(this.state.flag) + "ugh  " + JSON.stringify(this.props.user));
				if (this.state.flag == false && this.props.user != null) {
					this.props.fetchZone(null);
					this.context.router.push("/");
					this.setState({
						user: this.props.user,
						flag: true
					});
				}
			},
			writable: true,
			configurable: true
		},
		updateProfile: {
			value: function updateProfile(event) {
				event.preventDefault();
				// console.log('updateProfile: ' + event.target.id + event.target.value)
				var updatedProfile = Object.assign({}, this.state.profile);
				updatedProfile[event.target.id] = event.target.value;
				this.setState({
					profile: updatedProfile
				});
			},
			writable: true,
			configurable: true
		},
		login: {
			value: function login(event) {
				event.preventDefault();
				// console.log("Sign in:" + JSON.stringify(this.state.profile))
				this.clearValues();
				if (this.state.profile.username.length == 0) {
					alert("you must enter a username");
					return;
				}
				if (this.state.profile.password.length == 0) {
					alert("you must enter password");
					return;
				}

				// console.log("user from Account.js: " + JSON.stringify(this.state.profile))

				// console.log("LOGIN PROFILE: " +JSON.stringify(this.state.profile))
				this.props.createLogin(this.state.profile);

				this.setState({
					flag: true
				});
				this.context.router.push("/");
			},
			writable: true,
			configurable: true
		},
		signUp: {
			value: function signUp(event) {
				event.preventDefault();
				// console.log("Sign Up:" + JSON.stringify(this.state.profile))
				if (this.state.profile.username.length == 0) {
					alert("you must enter a username");
					return;
				}
				if (this.state.profile.password.length == 0) {
					alert("you must enter password");
					return;
				}
				this.props.createSignUp(this.state.profile);
			},
			writable: true,
			configurable: true
		},
		logout: {
			value: function logout(event) {
				var _this = this;
				APIManager.get("/account/logout", null, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}
					// this.props.fetchCurrentUser(response.result)
					_this.props.currentUserReceived(null);
					_this.clearValues();
					_this.setState({
						flag: false
					});
					console.log("HERE YOU GO: " + JSON.stringify(_this.state.flag));
				});
			},
			writable: true,
			configurable: true
		},
		uploadImage: {
			value: function uploadImage(files) {
				var _this = this;
				var image = files[0];
				console.log("COMMENT Container Image file: " + JSON.stringify(image));
				var timestamp = Date.now() / 1000;
				var cloudName = "jdrichardstech";
				var uploadPreset = "qfk6kfpf";
				var apiSecret = "e8LAFbk1H23PLU02S5Og2DzsMYQ";
				var paramStr = "timestamp=" + timestamp + "&upload_preset=" + uploadPreset + "e8LAFbk1H23PLU02S5Og2DzsMYQ";
				var signature = sha1(paramStr);
				var apiKey = "854536555581142";
				var params = {
					api_key: apiKey,
					timestamp: timestamp,
					upload_preset: uploadPreset,
					signature: signature
				};
				var url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
				APIManager.upload(url, image, params, function (err, response) {
					if (err) {
						console.log("Upload err: " + err.message);
						return;
					}
					console.log("Uploaded image: " + JSON.stringify(response.body));
					var imageUrl = response.body.secure_url;

					var updatedProfile = Object.assign({}, _this.state.profile);
					updatedProfile.image = response.body.secure_url;
					_this.setState({
						profile: updatedProfile
					});
					alert("Your profile image has been uploaded");
				});
			},
			writable: true,
			configurable: true
		},
		clearValues: {
			value: function clearValues() {
				this.refs.use.value = "";
				this.refs.pass.value = "";
				this.refs.username.value = "";
				this.refs.password.value = "";
				this.refs.gender.value = "";
				this.refs.city.value = "";
				this.refs.bio.value = "";
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var content = null;
				if (this.props.user == null) {
					content = React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							{ className: "sb-site-container", style: { background: "#BCDCF5" } },
							React.createElement(Header, null),
							React.createElement(
								"div",
								{ className: "ms-hero-page-override ms-hero-img-city ms-hero-bg-dark-light" },
								React.createElement(
									"div",
									{ className: "container" },
									React.createElement(
										"div",
										{ className: "text-center" },
										React.createElement(
											"span",
											{ className: "ms-logo ms-logo-lg ms-logo-white center-block mb-2 mt-2 animated zoomInDown animation-delay-5" },
											"JD"
										),
										React.createElement(
											"h1",
											{ className: "no-m ms-site-title color-white center-block ms-site-title-lg mt-2 animated zoomInDown animation-delay-5" },
											"Neighborhood",
											React.createElement(
												"span",
												null,
												"Bulletin Board"
											)
										),
										React.createElement(
											"p",
											{ className: "lead lead-lg color-white text-center center-block mt-2 mw-800 text-uppercase fw-500 animated fadeInUp animation-delay-7" },
											"Share and discover happenings and observances in your neighborhood Please register or Login",
											React.createElement("br", null),
											React.createElement("br", null)
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
										{ className: "col-md-6 col-md-offset-3" },
										React.createElement(
											"div",
											{ className: "card card-hero card-primary animated fadeInUp animation-delay-7" },
											React.createElement(
												"div",
												{ className: "card-block" },
												React.createElement(
													"h1",
													{ className: "color-primary text-center" },
													"Login"
												),
												React.createElement(
													"center",
													null,
													React.createElement(
														"span",
														{ style: { fontSize: ".9em", textAlign: "center", color: "#9e9e9e" } },
														" If you do not want to register...feel free to login with",
														React.createElement("br", null),
														"username: jd   password:123"
													)
												),
												React.createElement(
													"form",
													{ className: "form-horizontal" },
													React.createElement(
														"fieldset",
														null,
														React.createElement(
															"div",
															{ className: "form-group" },
															React.createElement(
																"label",
																{ className: "col-md-2 control-label" },
																"Username"
															),
															React.createElement(
																"div",
																{ className: "col-md-10" },
																React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", className: "form-control", id: "username", placeholder: "Username", ref: "use" }),
																" "
															)
														),
														React.createElement(
															"div",
															{ className: "form-group" },
															React.createElement(
																"label",
																{ className: "col-md-2 control-label" },
																"Password"
															),
															React.createElement(
																"div",
																{ className: "col-md-10" },
																React.createElement("input", { onChange: this.updateProfile.bind(this), type: "password", className: "form-control", id: "password", placeholder: "Password", ref: "pass" }),
																" "
															)
														)
													),
													React.createElement(
														"button",
														{ onClick: this.login.bind(this), className: "btn btn-raised btn-primary btn-block", type: "submit" },
														"Login",
														React.createElement("i", { className: "zmdi zmdi-long-arrow-right no-mr ml-1" })
													)
												)
											)
										)
									)
								),
								React.createElement(
									"div",
									{ style: { marginTop: 130 }, className: "row" },
									React.createElement(
										"div",
										{ className: "col-md-6 col-md-offset-3" },
										React.createElement(
											"div",
											{ className: "card card-hero card-primary animated fadeInUp animation-delay-9" },
											React.createElement(
												"div",
												{ className: "card-block" },
												React.createElement(
													"h2",
													{ className: "color-primary text-center" },
													"Register"
												),
												React.createElement(
													"form",
													null,
													React.createElement(
														"fieldset",
														null,
														React.createElement(
															"div",
															{ className: "form-group label-floating" },
															React.createElement(
																"div",
																{ className: "input-group" },
																React.createElement(
																	"span",
																	{ className: "input-group-addon" },
																	React.createElement("i", { className: "zmdi zmdi-account" })
																),
																React.createElement(
																	"label",
																	{ className: "control-label" },
																	"Username"
																),
																React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: "username", className: "form-control", ref: "username" }),
																" "
															)
														),
														React.createElement(
															"div",
															{ className: "form-group label-floating" },
															React.createElement(
																"div",
																{ className: "input-group" },
																React.createElement(
																	"span",
																	{ className: "input-group-addon" },
																	React.createElement("i", { className: "zmdi zmdi-lock" })
																),
																React.createElement(
																	"label",
																	{ className: "control-label" },
																	"Password"
																),
																React.createElement("input", { onChange: this.updateProfile.bind(this), type: "password", id: "password", className: "form-control", ref: "password" }),
																" "
															)
														),
														React.createElement(
															"div",
															{ className: "form-group label-floating" },
															React.createElement(
																"div",
																{ className: "input-group" },
																React.createElement(
																	"span",
																	{ className: "input-group-addon" },
																	React.createElement("i", { className: "zmdi zmdi-male-female" })
																),
																React.createElement(
																	"label",
																	{ className: "control-label" },
																	"Gender"
																),
																React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: "gender", className: "form-control", ref: "gender" }),
																" "
															)
														),
														React.createElement(
															"div",
															{ className: "form-group label-floating" },
															React.createElement(
																"div",
																{ className: "input-group" },
																React.createElement(
																	"span",
																	{ className: "input-group-addon" },
																	React.createElement("i", { className: "zmdi zmdi-city" })
																),
																React.createElement(
																	"label",
																	{ className: "control-label" },
																	"City"
																),
																React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: "city", className: "form-control", ref: "city" }),
																" "
															)
														),
														React.createElement(
															"div",
															{ className: "form-group label-floating" },
															React.createElement(
																"div",
																{ className: "input-group" },
																React.createElement(
																	"span",
																	{ className: "input-group-addon" },
																	React.createElement("i", { className: "zmdi zmdi-puzzle-piece" })
																),
																React.createElement(
																	"label",
																	{ className: "control-label" },
																	"Short Bio"
																),
																React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: "bio", className: "form-control", ref: "bio" }),
																" "
															)
														),
														React.createElement(
															"div",
															{ className: "form-group label-floating" },
															React.createElement(
																"div",
																{ className: "input-group" },
																React.createElement(
																	"span",
																	{ className: "input-group-addon" },
																	React.createElement("i", { className: "zmdi zmdi-camera" })
																),
																React.createElement(
																	DropZone,
																	{ id: "dropzoneLocation", style: { color: "blue" }, onDrop: this.uploadImage.bind(this) },
																	React.createElement(
																		"a",
																		{ href: "#dropzoneLocation" },
																		"Add Profile Image"
																	)
																)
															)
														),
														React.createElement(
															"button",
															{ onClick: this.signUp.bind(this), className: "btn btn-raised btn-block btn-primary", type: "submit" },
															"Register Now"
														)
													)
												)
											)
										)
									)
								)
							),
							React.createElement(Footer, null),
							React.createElement(BackToTop, null)
						)
					);
				} else {
					content = React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							{ className: "sb-site-container", style: { background: "#BCDCF5" } },
							React.createElement(Header, null),
							React.createElement(
								"div",
								{ className: "container" },
								React.createElement(
									"div",
									{ className: "col-md-8" },
									React.createElement(Comments, null)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "col-md-4" },
										React.createElement(
											"div",
											{ className: "card animated fadeInUp animation-delay-7" },
											React.createElement(
												"div",
												{ className: "ms-hero-bg-info ms-hero-img-mountain" },
												React.createElement(
													"h3",
													{ className: "color-white index-1 text-center no-m pt-4", style: { fontWeight: 300, fontSize: "2.3em" } },
													React.createElement(
														Link,
														{ style: { color: "white" }, to: "/profile/" + this.props.user.username },
														this.props.user.username.toUpperCase()
													)
												),
												React.createElement(
													Link,
													{ to: "/profile/" + this.props.user.username },
													React.createElement("img", { src: this.props.user.image, alt: "...", className: "img-avatar-circle" })
												),
												" "
											),
											React.createElement(
												"div",
												{ className: "card-block pt-4 text-center" },
												React.createElement(
													"h3",
													{ className: "color-primary" },
													"About me"
												),
												React.createElement(
													"p",
													null,
													"Gender: ",
													this.props.user.gender
												),
												React.createElement(
													"p",
													null,
													"City: ",
													this.props.user.city
												),
												React.createElement(
													"p",
													null,
													"Bio: ",
													this.props.user.bio
												),
												" ",
												React.createElement(
													Link,
													{ className: "btn btn-raised btn-danger", to: "/updateprofile/" + this.props.user.username },
													React.createElement("i", { className: "zmdi zmdi-account-box-o" }),
													"Update Profile"
												),
												React.createElement("br", null),
												React.createElement(
													"a",
													{ style: { fontSize: "1em" }, className: "pull-right", href: "#", onClick: this.logout.bind(this) },
													"Logout"
												),
												React.createElement("br", null)
											)
										),
										React.createElement(Zones, null)
									)
								)
							),
							React.createElement(Footer, null),
							React.createElement(BackToTop, null)
						)
					);
				}

				{}
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

	return Account;
})(Component);

var stateToProps = function (state) {
	return {
		user: state.account.user
	};

};

var dispatchToProps = function (dispatch) {
	return {
		currentUserReceived: function (user) {
			return dispatch(actions.currentUserReceived(user));
		},
		fetchCurrentUser: function (params) {
			return dispatch(actions.fetchCurrentUser(params));
		},
		fetchZone: function (params) {
			return dispatch(actions.fetchZone(params));
		},
		createLogin: function (params) {
			return dispatch(actions.createLogin(params));
		},
		createSignUp: function (params) {
			return dispatch(actions.createSignUp(params));
		}

	};
};
Account.contextTypes = {
	router: PropTypes.object
};

module.exports = connect(stateToProps, dispatchToProps)(Account);
// console.log('LOGIN: ' + JSON.stringify(this.state.user))

// this.props.fetchZone(null)

/*  let content = (this.props.appStatus=='loading') ? 'Loading...' : contentFiller*/