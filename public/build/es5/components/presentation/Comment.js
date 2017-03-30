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
var ImageHelper = require("../../utils").ImageHelper;
var DropZone = _interopRequire(require("react-dropzone"));

var Comment = (function (Component) {
	function Comment() {
		_classCallCheck(this, Comment);

		_get(Object.getPrototypeOf(Comment.prototype), "constructor", this).call(this);
		this.state = {
			updated: null,

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
					showEdit: false

				});
			},
			writable: true,
			configurable: true
		},
		handleEditChange: {
			value: function handleEditChange(event) {
				var updatedComment = Object.assign({}, this.state.updated);
				updatedComment[event.target.id] = event.target.value;

				this.setState({
					updated: updatedComment
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
					showEdit: true
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
				var currentComment = this.props.currentComment;
				var author = currentComment.author;
				var radius = 16;

				var showEditButton = this.props.user.username == author.username && this.state.showEdit == true ? React.createElement(
					"div",
					{ className: "col-lg-4 text-right" },
					React.createElement(
						"a",
						{ onClick: this.handleEditClick.bind(this), href: "javascript:void(0)", className: "btn btn-primary btn-raised btn-block animate-icon" },
						"Edit",
						React.createElement("i", { className: "ml-1 no-mr zmdi zmdi-long-arrow-right" })
					)
				) : null;



				var commentEditingInfo = this.state.isEditing == true ? React.createElement(
					"div",
					null,
					React.createElement(
						"label",
						null,
						"Edit Comment: "
					),
					React.createElement("br", null),
					React.createElement("textarea", { style: { border: "1px solid #D0D3DB", width: "100%", paddingLeft: 15 }, className: "form-control", onChange: this.handleEditChange.bind(this), type: "text", defaultValue: currentComment.body, id: "body" }),
					" ",
					React.createElement("br", null),
					React.createElement(
						"label",
						null,
						"Edit Image"
					),
					React.createElement(
						DropZone,
						{ style: { border: "1px solid #fff" }, onDrop: this.grabImage.bind(this) },
						React.createElement(
							"div",
							{ style: { width: 150, height: 150, border: "1px inset #D0D3DB", borderRadius: 5, margin: "15px auto", padding: 15 } },
							React.createElement(
								"center",
								null,
								React.createElement(
									"a",
									{ href: "#" },
									"To upload",
									React.createElement("br", null),
									"Click here or drag and drop image here "
								)
							)
						)
					),
					" ",
					React.createElement("br", null),
					React.createElement("br", null),
					React.createElement(
						"div",
						{ className: "col-md-6" },
						React.createElement(
							"div",
							{ style: { marginTop: 50 } },
							React.createElement("img", { style: { height: 100 }, src: this.props.commentImage })
						)
					),
					React.createElement(
						"button",
						{ style: { marginTop: 10 }, className: "btn btn-danger", onClick: this.updateComment.bind(this) },
						"Submit"
					)
				) : React.createElement("div", null);

				var thisDate = currentComment.timestamp.substr(0, 10);
				var year = thisDate.substr(0, 4);

				var reverseDate = thisDate.concat("-" + year);
				var newDate = reverseDate.substr(5, 15);
				var time = currentComment.timestamp.substr(11, 5);
				var hourDigits = time.substr(0, 2);
				var minutes = time.substr(2, 3);
				var hour = hourDigits <= 12 ? hourDigits : hourDigits;
				var amPm = hourDigits >= 12 ? "pm" : "am";
				var newTime = hour + minutes + amPm;
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
										{ className: "no-mt" },
										React.createElement(
											"a",
											{ href: "javascript:void(0)" },
											"Create A Title In Model"
										)
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
										React.createElement("img", { src: author.image, alt: "...", className: "img-circle mr-1" })
									),
									" by",
									React.createElement(
										"a",
										{ href: "javascript:void(0)" },
										React.createElement(
											Link,
											{ to: "/profile/" + currentComment.username },
											currentComment.username
										)
									),
									" in",
									React.createElement(
										"a",
										{ href: "javascript:void(0)", className: "ms-tag ms-tag-info" },
										"Design"
									),
									React.createElement(
										"span",
										{ className: "ml-1 hidden-xs" },
										React.createElement("i", { className: "zmdi zmdi-time mr-05 color-info" }),
										React.createElement(
											"span",
											{ className: "color-medium-dark" },
											newTime,
											" | ",
											newDate
										)
									)
								),
								showEditButton,
								React.createElement(
									"div",
									null,
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