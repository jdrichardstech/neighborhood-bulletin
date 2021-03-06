"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Link = require("react-router").Link;
var DateUtils = _interopRequire(require("../../utils/DateUtils"));

var DropZone = _interopRequire(require("react-dropzone"));

var Time = _interopRequire(require("react-time"));

var Comment = (function (Component) {
	function Comment() {
		_classCallCheck(this, Comment);

		_get(Object.getPrototypeOf(Comment.prototype), "constructor", this).call(this);
		this.state = {
			updated: null,
			picDropped: false,

			isEditing: false,
			showEdit: true
		};
	}

	_inherits(Comment, Component);

	_prototypeProperties(Comment, null, {
		componentDidMount: {
			value: function componentDidMount() {},
			writable: true,
			configurable: true
		},
		handleEditClick: {
			value: function handleEditClick(event) {
				this.setState({
					isEditing: true,
					showEdit: false });
			},
			writable: true,
			configurable: true
		},
		handleEditChange: {
			value: function handleEditChange(event) {
				var updatedComment = Object.assign({}, this.state.updated);
				updatedComment[event.target.id] = event.target.value;

				this.setState({
					updated: updatedComment,
					picDropped: true
				});
			},
			writable: true,
			configurable: true
		},
		cancelEdit: {
			value: function cancelEdit(event) {
				this.setState({
					isEditing: false,
					showEdit: true
				});
			},
			writable: true,
			configurable: true
		},
		updateComment: {
			value: function updateComment(event) {
				var updatedComment = Object.assign({}, this.state.updated);

				// console.log("Presentation comment updated: " + JSON.stringify(updatedComment))
				if (this.state.updated != null) {
					this.props.handleSubmitEdit(this.props.currentComment, updatedComment);
				}
				this.setState({
					updated: null,
					isEditing: false,
					showEdit: true,
					picDropped: false
				});
			},
			writable: true,
			configurable: true
		},
		grabImage: {
			value: function grabImage(files) {
				console.log("Grab image: " + JSON.stringify(files));

				var newImage = Object.assign({}, this.state.updated);
				newImage.currectImage = files;
				this.setState({
					updated: newImage
				});

				this.props.handleImage(files);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var newImage = this.state.updated == null && this.state.picDropped == false ? null : this.props.commentImage;
				var currentComment = this.props.currentComment;
				var author = currentComment.author;
				var radius = 16;
				var showEditButton = this.props.user.username == author.username && this.state.showEdit == true ? React.createElement(
					"div",
					{ className: "col-lg-4 text-right" },
					React.createElement(
						"a",
						{ onClick: this.handleEditClick.bind(this), href: "javascript:void(0)", className: "btn btn-primary btn-raised btn-block" },
						React.createElement("i", { className: "ml-1 no-mr zmdi zmdi-edit" }),
						"  Edit"
					)
				) : null;

				var commentEditingInfo = this.state.isEditing == true ? React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-12" },
							React.createElement("hr", { style: { border: "2px solid #03a9f4", background: "#03a9f4", color: "#03a9f4" } }),
							React.createElement(
								"div",
								{ style: { padding: 30 } },
								React.createElement(
									"h3",
									null,
									"Edit your current comment below:"
								),
								React.createElement("input", { className: "form-control", onChange: this.handleEditChange.bind(this), type: "text", placeholder: "Change Title", id: "title" }),
								" ",
								React.createElement("br", null),
								React.createElement("input", { className: "form-control", onChange: this.handleEditChange.bind(this), type: "text", placeholder: "Change Text", id: "body" }),
								" ",
								React.createElement("br", null)
							)
						)
					),
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-6", style: { padding: 30 } },
							React.createElement(
								DropZone,
								{ style: { border: "1px solid white", fontSize: "1.5em" }, onDrop: this.grabImage.bind(this) },
								React.createElement(
									"a",
									{ onClick: this.handleEditClick.bind(this), href: "javascript:void(0)" },
									React.createElement("i", { className: "ml-1 no-mr zmdi zmdi-camera" }),
									" Upload New Post Image"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "col-md-6", style: { padding: 30 } },
							React.createElement(
								"div",
								{ style: { marginTop: 50 } },
								React.createElement("img", { style: { height: 100 }, src: newImage, ref: "image" })
							)
						)
					),
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-12", style: { padding: 30 } },
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "col-md-6", style: { padding: 10 } },
									React.createElement(
										"a",
										{ style: { width: "40%", color: "white" }, onClick: this.updateComment.bind(this), href: "javascript:void(0)", className: "pull-right btn btn-primary btn-raised btn-block animate-icon" },
										"Submit  ",
										React.createElement("i", { className: "ml-1 no-mr zmdi zmdi-long-arrow-right" })
									)
								),
								React.createElement(
									"div",
									{ className: "col-md-6", style: { padding: 10 } },
									React.createElement(
										"a",
										{ style: { width: "40%", color: "white" }, onClick: this.cancelEdit.bind(this), href: "javascript:void(0)", className: "pull-left btn btn-danger btn-raised btn-block " },
										React.createElement("i", { className: "ml-1 no-mr zmdi zmdi-close" }),
										"  Cancel"
									)
								),
								React.createElement("div", { className: "col-md-6" })
							)
						)
					)
				) : React.createElement("div", null);


				return React.createElement(
					"div",
					null,
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
									{ className: "col-lg-6" },
									React.createElement("img", { src: currentComment.commentImage, alt: "", className: "img-responsive mb-4" })
								),
								React.createElement(
									"div",
									{ className: "col-lg-6" },
									React.createElement(
										"h3",
										{ className: "no-mt", style: { color: "#03a9f4" } },
										currentComment.title
									),
									React.createElement(
										"p",
										{ className: "mb-4" },
										currentComment.body
									)
								)
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "col-lg-8" },
									React.createElement(
										Link,
										{ to: "/profile/" + currentComment.username },
										React.createElement("img", { style: { height: 50, width: 50, borderRadius: 25 }, src: author.image, alt: "...", className: "img-circle mr-1" })
									),
									"by ",
									React.createElement(
										"a",
										{ className: "ms-tag ms-tag-primary", href: "javascript:void(0)" },
										React.createElement(
											Link,
											{ style: { color: "white" }, to: "/profile/" + currentComment.username },
											currentComment.username
										)
									),
									React.createElement(
										"span",
										{ className: "ml-1 hidden-xs" },
										React.createElement("i", { className: "zmdi zmdi-time mr-05 color-info" }),
										React.createElement(
											"span",
											{ className: "color-medium-dark" },
											DateUtils.formattedDate(currentComment.timestamp)
										)
									)
								),
								React.createElement(
									"div",
									null,
									showEditButton
								),
								React.createElement("br", null),
								React.createElement(
									"div",
									null,
									React.createElement("br", null),
									React.createElement("br", null),
									commentEditingInfo
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

	return Comment;
})(Component);

module.exports = Comment;
// console.log("Comment ID: " + this.props.currentComment._id)