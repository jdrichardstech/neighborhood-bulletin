"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var DropZone = _interopRequire(require("react-dropzone"));

var CreateComment = (function (Component) {
	function CreateComment() {
		_classCallCheck(this, CreateComment);

		_get(Object.getPrototypeOf(CreateComment.prototype), "constructor", this).call(this);
		this.state = {
			key: 1,
			picDropped: false,
			comment: {
				commentImage: null,
				body: "" }
		};
	}

	_inherits(CreateComment, Component);

	_prototypeProperties(CreateComment, null, {
		grabImage: {
			value: function grabImage(files) {
				console.log("Grab image: " + JSON.stringify(files));
				var newImage = Object.assign({}, this.state.comment);
				newImage.commentImage = files;

				console.log("GRABBED: " + JSON.stringify(this.state.commentImage));
				this.props.handleImage(files);
				this.setState({
					commentImage: newImage,
					picDropped: true
				});
			},
			writable: true,
			configurable: true
		},
		updateComment: {
			value: function updateComment(event) {
				//		console.log('updateComment: ' + event.target.id + ' == ' + event.target.value)
				var updatedComment = Object.assign({}, this.state.comment);
				updatedComment[event.target.id] = event.target.value;
				this.setState({
					comment: updatedComment
				});
			},
			writable: true,
			configurable: true
		},
		submitComment: {
			value: function submitComment(event) {
				console.log("submitComment: " + JSON.stringify(this.state.comment));
				this.props.onCreate(this.state.comment);
				this.setState({
					commentImage: null,
					picDropped: false
				});
			},
			writable: true,
			configurable: true
		},
		handleSelect: {
			value: function handleSelect(key) {
				alert("selected " + key);
				this.setState({ key: key });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var newImage = this.state.comment.commentImage == null && this.state.picDropped != true ? null : React.createElement("img", { style: { width: 100, height: 100 }, src: this.props.commentImage });


				return React.createElement(
					"div",
					null,
					React.createElement(
						"h4",
						null,
						"Create Comment"
					),
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-12" },
							React.createElement("input", { onChange: this.updateComment.bind(this), id: "body", className: "form-control", type: "text", placeholder: "Comment" }),
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
								DropZone,
								{ onDrop: this.grabImage.bind(this) },
								React.createElement(
									"div",
									{ style: { width: 150, height: 150, border: "1px groove #E6E7F5", borderRadius: 5, margin: "25px auto", padding: 30 } },
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
							React.createElement("br", null)
						),
						React.createElement(
							"div",
							{ className: "col-md-6" },
							React.createElement("br", null),
							React.createElement("br", null),
							newImage,
							" ",
							React.createElement("br", null)
						)
					),
					React.createElement(
						"button",
						{ onClick: this.submitComment.bind(this), className: "btn btn-info" },
						"Submit Comment"
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return CreateComment;
})(Component);

module.exports = CreateComment;