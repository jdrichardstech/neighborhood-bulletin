"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var styles = _interopRequire(require("./styles"));

var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Link = require("react-router").Link;
var DropZone = _interopRequire(require("react-dropzone"));

var sha1 = _interopRequire(require("sha1"));

var _presentation = require("../presentation");

var Header = _presentation.Header;
var Footer = _presentation.Footer;
var BackToTop = _presentation.BackToTop;
var UpdateProfile = (function (Component) {
	function UpdateProfile(props) {
		_classCallCheck(this, UpdateProfile);

		_get(Object.getPrototypeOf(UpdateProfile.prototype), "constructor", this).call(this, props);
		this.state = {
			user: null,
			updated: {}
		};
	}

	_inherits(UpdateProfile, Component);

	_prototypeProperties(UpdateProfile, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var updated = Object.assign({}, this.state.user);
				updated = this.props.user;
				this.setState({
					user: updated
				});
			},
			writable: true,
			configurable: true
		},
		componentDidUpdate: {
			value: function componentDidUpdate() {
				if (this.state.user == null) {
					this.props.fetchCurrentUser(null);
					var updated = Object.assign({}, this.state.user);
					updated = this.props.user;
					this.setState({
						user: updated
					});
				}
			},
			writable: true,
			configurable: true
		},
		updateCurrentUser: {
			value: function updateCurrentUser(event) {
				event.preventDefault();
				// console.log('updateCurrentUser: '+event.target.id+' == '+event.target.value)
				var updatedProfile = Object.assign({}, this.state.updated);
				updatedProfile[event.target.id] = event.target.value;
				this.setState({
					updated: updatedProfile
				});
			},
			writable: true,
			configurable: true
		},
		updateProfile: {
			value: function updateProfile(event) {
				event.preventDefault();

				if (Object.keys(this.state.updated).length == 0) {
					alert("No Changes Made!!");
					return;
				}

				this.props.updateProfile(this.props.user, this.state.updated);
				this.setState({
					user: null
				});
				alert("Profile Updated");
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

					var updatedProfile = Object.assign({}, _this.state.updated);
					updatedProfile.image = response.body.secure_url;
					_this.setState({
						updated: updatedProfile
					});
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var content = null;
				var image = null;

				var currentUser = this.props.user;

				content = React.createElement(
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
								React.createElement("img", { src: currentUser.image, className: "ms-avatar-hero animated zoomIn animation-delay-7" }),
								React.createElement(
									"h1",
									{ className: "color-white mt-4 animated fadeInUp animation-delay-10" },
									currentUser.firstName,
									" ",
									currentUser.lastName
								),
								React.createElement(
									"h3",
									{ className: "color-medium no-mb animated fadeInUp animation-delay-10" },
									currentUser.bio
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
								{ className: "col-md-6" },
								React.createElement(
									"div",
									{ className: "card-block" },
									React.createElement(
										"h2",
										{ className: "color-primary no-mb", style: { textAlign: "center", padding: "20px 0 20px 0" } },
										"Your Current Information"
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
													React.createElement("i", { className: "zmdi zmdi-face mr-1 color-warning" }),
													" Fullname"
												),
												React.createElement(
													"td",
													null,
													currentUser.firstName,
													" ",
													currentUser.lastName
												)
											),
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
													currentUser.username
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
													currentUser.gender
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
														currentUser.username,
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
														currentUser.username,
														".com"
													)
												)
											)
										)
									),
									React.createElement(
										"div",
										null,
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
							),
							React.createElement(
								"div",
								{ className: "col-md-6" },
								React.createElement(
									"div",
									{ className: "card-block" },
									React.createElement(
										"h2",
										{ style: { textAlign: "center", padding: "20px 0 20px 0" } },
										"Update Your Info"
									),
									React.createElement(
										"div",
										{ style: { width: "65%", margin: "0 auto 50px auto" } },
										React.createElement(
											"label",
											null,
											"First Name:"
										),
										React.createElement("input", { onChange: this.updateCurrentUser.bind(this), type: "text", className: "form-control", id: "firstName", defaultValue: currentUser.firstName }),
										React.createElement(
											"label",
											null,
											"Last Name:"
										),
										React.createElement("input", { onChange: this.updateCurrentUser.bind(this), type: "text", className: "form-control", id: "lastName", defaultValue: currentUser.lastName }),
										React.createElement(
											"label",
											null,
											"New Gender:"
										),
										React.createElement("input", { onChange: this.updateCurrentUser.bind(this), type: "text", className: "form-control", id: "gender", defaultValue: currentUser.gender }),
										React.createElement(
											"label",
											null,
											"New City:"
										),
										React.createElement("input", { onChange: this.updateCurrentUser.bind(this), type: "text", className: "form-control", id: "city", defaultValue: currentUser.city }),
										React.createElement(
											"label",
											null,
											"Bio:"
										),
										React.createElement("input", { onChange: this.updateCurrentUser.bind(this), type: "text", className: "form-control", id: "bio", defaultValue: currentUser.bio }),
										React.createElement("br", null),
										React.createElement(
											DropZone,
											{ style: { border: "1px solid white", fontSize: "1.5em" }, nDrop: this.uploadImage.bind(this) },
											React.createElement(
												"a",
												{ href: "javascript:void(0)" },
												React.createElement("i", { className: "ml-1 no-mr zmdi zmdi-camera" }),
												" Upload New Profile Image"
											)
										),
										React.createElement("br", null),
										React.createElement(
											"button",
											{ onClick: this.updateProfile.bind(this), className: "btn btn-warning  btn-raised btn-block", type: "submit" },
											React.createElement("i", { className: "ml-1 no-mr zmdi zmdi-face" }),
											"  Update Profile"
										)
									)
								)
							)
						)
					)
				);
				return React.createElement(
					"div",
					{ className: "sb-site-container", style: { background: "#fff" } },
					React.createElement(Header, null),
					content,
					React.createElement(BackToTop, null),
					React.createElement(Footer, null)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return UpdateProfile;
})(Component);

var stateToProps = function (state) {
	return {
		appStatus: state.profile.appStatus,
		user: state.account.user
	};
};

var dispatchToProps = function (dispatch) {
	return {
		fetchProfile: function (params) {
			return dispatch(actions.fetchProfile(params));
		},
		updateProfile: function (profile, updated) {
			return dispatch(actions.updateProfile(profile, updated));
		},
		fetchprofile: function (params) {
			return dispatch(actions.fetchprofile(params));
		},
		profileUpdated: function (user) {
			return dispatch(actions.profileUpdated(user));
		},
		profileReceived: function (user) {
			return dispatch(actions.profileReceived(user));
		},
		fetchCurrentUser: function (params) {
			return dispatch(actions.fetchCurrentUser(params));
		},
		currentUserUpdated: function (user) {
			return dispatch(actions.currentUserUpdated(user));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(UpdateProfile);