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

				console.log("user from Account.js: " + JSON.stringify(this.state.profile));
				// APIManager.post('/account/login', this.state.profile, (err, response)=>{
				//   if(err){
				//
				//     alert(err.message)
				//     return
				//   }
				//   console.log("This.state.profile: " + JSON.stringify(this.state.profile))
				//   this.props.currentUserReceived(response.user)
				//   // this.props.fetchCurrentUser(response.user)
				// })
				console.log("LOGIN PROFILE: " + JSON.stringify(this.state.profile));
				this.props.createLogin(this.state.profile);

				this.setState({
					flag: true
				});
				this.context.router.push("/");
				console.log("LOGIN: " + JSON.stringify(this.state.user));
			},
			writable: true,
			configurable: true
		},
		signUp: {
			value: function signUp(event) {
				event.preventDefault();
				console.log("Sign Up:" + JSON.stringify(this.state.profile));
				if (this.state.profile.username.length == 0) {
					alert("you must enter a username");
					return;
				}
				if (this.state.profile.password.length == 0) {
					alert("you must enter password");
					return;
				}



				// APIManager.post('/account/register', this.state.profile, (err, response)=>{
				//   if(err){
				//     alert('Username Taken. Choose another UserName')
				//     return
				//   }
				//   console.log("post 2nd step: " + JSON.stringify(response))
				//   this.props.currentUserReceived(response.user)
				//   // this.props.fetchCurrentUser(response.user)
				// })
				// console.log("Sign Up:" + JSON.stringify(this.state.profile))
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
							React.createElement(
								"div",
								{ className: "modal modal-primary", id: "ms-account-modal", tabIndex: "-1", role: "dialog", "aria-labelledby": "myModalLabel" },
								React.createElement(
									"div",
									{ className: "modal-dialog animated zoomIn animated-3x", role: "document" },
									React.createElement(
										"div",
										{ className: "modal-content" },
										React.createElement(
											"div",
											{ className: "modal-header shadow-2dp no-pb" },
											React.createElement(
												"button",
												{ type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
												React.createElement(
													"span",
													{ "aria-hidden": "true" },
													React.createElement("i", { className: "zmdi zmdi-close" })
												)
											),
											React.createElement(
												"div",
												{ className: "modal-title text-center" },
												React.createElement(
													"span",
													{ className: "ms-logo ms-logo-white ms-logo-sm mr-1" },
													"JD"
												),
												React.createElement(
													"h3",
													{ className: "no-m ms-site-title" },
													"Neighborhood",
													React.createElement(
														"span",
														null,
														"Bulletin Board"
													)
												)
											)
										)
									)
								)
							),
							React.createElement(
								"header",
								{ className: "ms-header ms-header-white" },
								React.createElement(
									"div",
									{ className: "container container-full" },
									React.createElement(
										"div",
										{ className: "ms-title" },
										React.createElement(
											"a",
											{ href: "index.html" },
											React.createElement(
												"span",
												{ className: "ms-logo animated zoomInDown animation-delay-5" },
												"JD"
											),
											React.createElement(
												"h1",
												{ className: "animated fadeInRight animation-delay-6" },
												"Neighborhood",
												React.createElement(
													"span",
													null,
													"Bulletin Board"
												)
											)
										)
									)
								)
							),
							React.createElement(
								"nav",
								{ className: "navbar navbar-static-top yamm ms-navbar ms-navbar-primary" },
								React.createElement(
									"div",
									{ className: "container container-full" },
									React.createElement(
										"div",
										{ className: "navbar-header" },
										React.createElement(
											"a",
											{ className: "navbar-brand", href: "index.html" },
											React.createElement(
												"span",
												{ className: "ms-logo ms-logo-sm" },
												"JD"
											),
											React.createElement(
												"span",
												{ className: "ms-title" },
												"Neighborhood",
												React.createElement(
													"strong",
													null,
													"Bulletin Board"
												)
											)
										)
									),
									React.createElement("div", { id: "navbar", className: "navbar-collapse collapse" }),
									React.createElement(
										"a",
										{ href: "javascript:void(0)", className: "sb-toggle-left btn-navbar-menu" },
										React.createElement("i", { className: "zmdi zmdi-menu" })
									)
								)
							),
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
											" ",
											React.createElement(
												"span",
												{ style: { textTransform: "lowercase" }, className: "color-warning" },
												" (feel free to login with -- username: jd & password:123 -- if you like)"
											)
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
																React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: "username ms-form-user", className: "form-control", ref: "username" }),
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
																React.createElement("input", { onChange: this.updateProfile.bind(this), type: "password", id: "password ms-form-pass", className: "form-control", ref: "password" }),
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
																React.createElement("input", { onChange: this.updateProfile.bind(this), type: "password", id: "city ms-form-pass", className: "form-control", ref: "city" }),
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
																React.createElement("input", { onChange: this.updateProfile.bind(this), type: "text", id: " bio ms-form-pass", className: "form-control", ref: "bio" }),
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
																	{ style: { color: "blue" }, onDrop: this.uploadImage.bind(this) },
																	React.createElement(
																		"a",
																		null,
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
							React.createElement(
								"footer",
								{ className: "ms-footer" },
								React.createElement(
									"div",
									{ className: "container" },
									React.createElement(
										"p",
										null,
										"Copyright © JDRichardsTech 2017"
									)
								)
							),
							React.createElement(
								"div",
								{ className: "btn-back-top" },
								React.createElement(
									"a",
									{ href: "#", "data-scroll": true, id: "back-top", className: "btn-circle btn-circle-primary btn-circle-sm btn-circle-raised " },
									React.createElement("i", { className: "zmdi zmdi-long-arrow-up" })
								)
							)
						)
					);
				} else {
					content = React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							{ className: "container" },
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "col-md-12" },
									React.createElement("img", { style: { borderRadius: 36, float: "left", marginRight: 12 }, src: ImageHelper.thumbnail(this.props.user.image, 72) }),
									React.createElement(
										"h3",
										null,
										"Hi ",
										React.createElement(
											"span",
											{ style: { color: "blue" } },
											React.createElement(
												Link,
												{ to: "/profile/" + this.props.user.username },
												this.props.user.username
											)
										)
									),
									React.createElement(
										"p",
										null,
										"Gender: ",
										this.props.user.gender
									),
									React.createElement("br", null),
									React.createElement("br", null),
									React.createElement(
										"button",
										{ style: styles.account.button, className: "btn btn-danger", onClick: this.logout.bind(this) },
										"Log Out"
									),
									" ",
									React.createElement(
										Link,
										{ to: "/updateprofile/" + this.props.user.username },
										React.createElement(
											"button",
											{ style: styles.account.button, className: "btn btn-warning", type: "" },
											"Update Profile"
										)
									)
								)
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "col-md-4" },
									React.createElement(Zones, null)
								),
								React.createElement(
									"div",
									{ className: "col-md-8" },
									React.createElement(Comments, null)
								)
							)
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
// this.props.fetchZone(null)

/*  let content = (this.props.appStatus=='loading') ? 'Loading...' : contentFiller*/