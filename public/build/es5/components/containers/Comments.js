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

var CreateComment = _presentation.CreateComment;
var Comment = _presentation.Comment;
var styles = _interopRequire(require("./styles"));

var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var DropZone = _interopRequire(require("react-dropzone"));

var sha1 = _interopRequire(require("sha1"));

var Comments = (function (Component) {
	function Comments() {
		_classCallCheck(this, Comments);

		_get(Object.getPrototypeOf(Comments.prototype), "constructor", this).call(this);
		this.state = {
			updated: {},
			commentsLoaded: false,
			index: 0
		};
	}

	_inherits(Comments, Component);

	_prototypeProperties(Comments, null, {
		submitComment: {
			value: function submitComment(comment) {
				if (this.props.user == null) {
					alert("Please Sign Up or Log In");
					return;
				}

				var updatedComment = Object.assign({}, comment);
				var zone = this.props.zones[this.props.index];
				updatedComment.commentImage = this.state.updated.commentImage;
				updatedComment.zone = zone._id;
				updatedComment.username = this.props.user.username;
				updatedComment.author = {
					id: this.props.user._id,
					username: this.props.user.username,
					image: this.props.user.image
				};

				this.props.createComment(updatedComment);
			},
			writable: true,
			configurable: true
		},
		componentDidUpdate: {
			value: function componentDidUpdate() {
				var _this = this;
				var zone = this.props.zones[this.props.index];
				if (zone == null) {
					console.log("NO SELECTED ZONE!!!!");
					return;
				}

				var commentsArray = this.props.commentsMap[zone._id];
				if (commentsArray != null) {
					// comments have been already loaded!
					return;
				}APIManager.get("/api/comment", { zone: zone._id }, function (err, response) {
					if (err) {
						alert("ERROR: " + err.message);
						return;
					}

					var comments = response.results;
					_this.props.commentsReceived(comments, zone);
				});
			},
			writable: true,
			configurable: true
		},
		submitEdit: {
			value: function submitEdit(comment, updated) {
				// console.log('update comment: '+ comment._id+", "+ JSON.stringify(updated))
				updated.commentImage = this.state.updated.commentImage;
				this.setState({
					commentImage: null
				});
				console.log("Updated Image: " + JSON.stringify(updated));
				this.props.updateComment(comment, updated);
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
					updatedProfile.commentImage = response.body.secure_url;
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
				var _this = this;
				var selectedZone = this.props.zones[this.props.index];
				var image = this.state.updated.commentImage == null ? "" : ImageHelper.thumbnail(this.state.updated.commentImage, 22);

				var zoneName = null;
				var commentList = null;
				var header = null;
				if (this.props.user != null) {
					if (selectedZone != null) {
						zoneName = selectedZone.name;
						var zoneComments = this.props.commentsMap[selectedZone._id];
						// console.log('ZoneComment: ' + JSON.stringify(this.props.commentsMap))
						// console.log('SELECTED ZONE ID = '+selectedZone._id)
						// console.log('COMMENTS MAP = '+JSON.stringify(this.props.commentsMap))
						if (zoneComments != null) {
							commentList = zoneComments.map(function (comment, i) {
								return React.createElement(
									"div",
									{ key: i },
									React.createElement(
										"li",
										null,
										React.createElement(Comment, { commentImage: _this.state.updated.commentImage, handleImage: _this.uploadImage.bind(_this), handleSubmitEdit: _this.submitEdit.bind(_this), user: _this.props.user, currentComment: comment, index: i })
									)
								);
							});
						}
					}

					header = React.createElement(
						"div",
						null,
						React.createElement(
							"article",
							{ className: "card wow fadeIn animation-delay-2 mb-4" },
							React.createElement(
								"div",
								{ className: "card-block" },
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "col-lg-12" },
										React.createElement(
											"h2",
											null,
											"Posts for ",
											React.createElement(
												"span",
												{ style: { color: "#03a9f4" } },
												zoneName
											)
										),
										React.createElement(
											"center",
											null,
											React.createElement("img", { style: { width: 690, height: 300 }, src: "/images/neighborhood.jpg" })
										)
									)
								)
							)
						),
						React.createElement(
							"ul",
							{ style: { listStyle: "none", padding: 0 } },
							commentList
						),
						React.createElement(
							"article",
							{ className: "card wow fadeInLeft animation-delay-5 mb-4" },
							React.createElement(
								"div",
								{ className: "card-block" },
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "col-lg-12" },
										React.createElement(CreateComment, { commentImage: this.state.updated.commentImage, handleImage: this.uploadImage.bind(this), onCreate: this.submitComment.bind(this) })
									)
								)
							)
						)
					);
				}

				var content = this.props.appStatus == "loading" ? React.createElement(
					"div",
					{ id: "ms-preload", className: "ms-preload" },
					React.createElement(
						"div",
						{ id: "status" },
						React.createElement(
							"div",
							{ className: "spinner" },
							React.createElement("div", { className: "dot1" }),
							React.createElement("div", { className: "dot2" })
						)
					)
				) : header;

				return React.createElement(
					"div",
					null,
					header
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Comments;
})(Component);

var stateToProps = function (state) {
	return {
		commentsMap: state.comment.map,
		// comments: state.comment.list,
		commentsLoaded: state.comment.commentsLoaded,
		appStatus: state.comment.appStatus,
		index: state.zone.selectedZone,
		zones: state.zone.list,
		user: state.account.user
	};
};

var dispatchToProps = function (dispatch) {
	return {
		commentsReceived: function (comments, zone) {
			return dispatch(actions.commentsReceived(comments, zone));
		},
		fetchComments: function (zone) {
			return dispatch(actions.fetchComments(zone));
		},
		updateComment: function (comment, updated) {
			return dispatch(actions.updateComment(comment, updated));
		},
		commentCreated: function (comment) {
			return dispatch(actions.commentCreated(comment));
		},
		createComment: function (comment) {
			return dispatch(actions.createComment(comment));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(Comments);
// this.props.fetchComments({ zone:zone._id})
// console.log("UPDATED COMMENT:" + JSON.stringify(this.state.updated))