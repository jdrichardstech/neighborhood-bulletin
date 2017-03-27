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
								image = this.props.user == null ? "" : ImageHelper.thumbnail(this.props.user.image, 150);
								content = this.props.user == null ? "loading" : React.createElement(
										"div",
										null,
										" ",
										React.createElement(
												"h1",
												{ style: { color: "white" } },
												"Update Your Profile"
										),
										React.createElement("br", null),
										React.createElement(
												"div",
												{ style: styles.profile.container },
												React.createElement(
														"h2",
														null,
														"Current Profile:"
												),
												React.createElement(
														"h3",
														null,
														"User: ",
														React.createElement(
																"span",
																{ style: styles.profile.entry },
																" ",
																this.props.user.username
														)
												),
												React.createElement(
														"p",
														null,
														"Gender: ",
														React.createElement(
																"span",
																{ style: styles.profile.entry },
																this.props.user.gender
														),
														React.createElement("br", null),
														"City:",
														React.createElement(
																"span",
																{ style: styles.profile.entry },
																" ",
																this.props.user.city
														),
														React.createElement("br", null),
														React.createElement("br", null),
														"Bio:",
														React.createElement(
																"span",
																{ style: styles.profile.entry },
																" ",
																this.props.user.bio
														),
														React.createElement("br", null),
														React.createElement("br", null),
														"Image: ",
														React.createElement("img", { src: image }),
														React.createElement("br", null),
														React.createElement("br", null),
														React.createElement(
																Link,
																{ to: "/" },
																React.createElement(
																		"button",
																		{ style: { marginRight: 10 }, type: "", className: "btn btn-info" },
																		"Home"
																)
														),
														React.createElement(
																Link,
																{ to: "/profile/" + this.props.user.username },
																React.createElement(
																		"button",
																		{ type: "", className: "btn btn-warning" },
																		"View Current Profile"
																)
														)
												)
										),
										React.createElement("br", null),
										React.createElement("br", null),
										React.createElement(
												"div",
												{ style: styles.account.container },
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
												React.createElement("textarea", { onChange: this.updateCurrentUser.bind(this), type: "text", className: "form-control", id: "bio", defaultValue: currentUser.bio }),
												React.createElement("br", null),
												React.createElement(
														"label",
														null,
														"Upload or Drop Image below:"
												),
												React.createElement(DropZone, { onDrop: this.uploadImage.bind(this) }),
												React.createElement("br", null),
												React.createElement(
														"button",
														{ onClick: this.updateProfile.bind(this), className: "btn btn-danger", type: "submit" },
														"Update Profile"
												)
										)
								);
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
				fetchCurrentUser: function (params) {
						return dispatch(actions.fetchCurrentUser(params));
				},
				currentUserUpdated: function (user) {
						return dispatch(actions.currentUserUpdated(user));
				},
				currentUserReceived: function (user) {
						return dispatch(actions.currentUserReceived(user));
				}
		};
};

module.exports = connect(stateToProps, dispatchToProps)(UpdateProfile);