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
			value: function componentDidMount() {
				console.log("Comment ID: " + this.props.currentComment._id);
			},
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
					null,
					React.createElement(
						"button",
						{ onClick: this.handleEditClick.bind(this), className: "btn btn-info" },
						"Edit"
					)
				) : null;



				var commentInfo = this.state.isEditing == false ? React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "row", style: { margin: "20px 0" } },
						React.createElement(
							"div",
							{ className: "col-md-3", style: { marginLeft: 0, paddingLeft: 0 } },
							React.createElement("img", { style: { height: 100, width: 100 }, src: currentComment.commentImage })
						),
						React.createElement(
							"div",
							{ className: "col-md-9" },
							React.createElement(
								"p",
								{ style: { fontSize: 15, fontWeight: 400, paddingTop: 20 } },
								"Comment: ",
								React.createElement("br", null),
								React.createElement(
									"span",
									{ style: { color: "blue" } },
									" ",
									currentComment.body
								)
							)
						)
					)
				) : React.createElement(
					"div",
					{ style: { marginTop: 20 } },
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-12" },
							React.createElement(
								"label",
								null,
								"Edit Comment: "
							),
							React.createElement("br", null),
							React.createElement("textarea", { style: { width: "100%" }, className: "form-control", onChange: this.handleEditChange.bind(this), type: "text", defaultValue: currentComment.body, id: "body" }),
							" ",
							React.createElement("br", null),
							React.createElement("br", null)
						)
					),
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-6" },
							React.createElement(
								"label",
								null,
								"Edit Image"
							),
							React.createElement(
								DropZone,
								{ onDrop: this.grabImage.bind(this) },
								React.createElement(
									"div",
									{ style: { width: 150, height: 150, border: "1px groove #D0D3DB", borderRadius: 5, margin: "25px auto", padding: 30 } },
									React.createElement(
										"center",
										null,
										React.createElement(
											"a",
											{ href: "#" },
											"Click here ",
											React.createElement("br", null),
											" or drag and drop your image in this box"
										)
									)
								)
							),
							" ",
							React.createElement("br", null),
							React.createElement("br", null)
						),
						React.createElement(
							"div",
							{ className: "col-md-6" },
							React.createElement(
								"div",
								{ style: { marginTop: 50 } },
								React.createElement("img", { style: { height: 100 }, src: this.props.commentImage })
							)
						)
					),
					React.createElement(
						"button",
						{ style: { marginTop: 10 }, className: "btn btn-danger", onClick: this.updateComment.bind(this) },
						"Submit"
					)
				);

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
						"div",
						null,
						commentInfo
					),
					React.createElement(
						"div",
						{ className: "pull-right" },
						React.createElement(
							"span",
							null,
							"Created By: ",
							React.createElement(
								"span",
								{ style: { color: "blue" } },
								currentComment.username
							),
							" at "
						),
						React.createElement(
							"span",
							{ style: { fontWeight: 200 } },
							" ",
							newTime,
							" | ",
							newDate
						),
						React.createElement(
							"span",
							{ style: { fontWeight: 200 } },
							React.createElement(
								Link,
								{ to: "/profile/" + currentComment.username },
								" ",
								React.createElement("img", { style: { borderRadius: radius, marginRight: 6 }, src: ImageHelper.thumbnail(author.image, 2 * radius) })
							)
						)
					),
					React.createElement(
						"div",
						null,
						showEditButton
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