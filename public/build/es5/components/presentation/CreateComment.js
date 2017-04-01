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
				body: "",
				title: ""

			}
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
				this.refs.title.value = " ";
				this.refs.body.value = " ";
				this.refs.imageUrl.value = " ";
			},
			writable: true,
			configurable: true
		},
		handleSelect: {
			value: function handleSelect(key) {
				//  alert('selected ' + key);
				this.setState({ key: key });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var newImage = this.state.comment.commentImage == null && this.state.picDropped == false ? null : this.props.commentImage;


				return React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-12" },
							React.createElement(
								"h2",
								{ style: { fontWeight: 400 } },
								React.createElement("i", { className: "zmdi zmdi-comment-text", style: { color: "#03a9f4" } }),
								"  Create New Post"
							),
							React.createElement("hr", { style: { border: "2px solid #03a9f4", background: "#03a9f4", color: "#03a9f4" } }),
							React.createElement(
								"div",
								{ style: { padding: "20px 30px 20px 30px" } },
								React.createElement(
									"h3",
									null,
									"Post:"
								),
								React.createElement("input", { style: { width: "75%", padding: "0 0 20px 0" }, onChange: this.updateComment.bind(this), id: "title", className: "form-control", type: "text", placeholder: "Add Title Here", ref: "title" }),
								React.createElement("input", { style: { width: "75%", padding: "0 0 20px 0" }, onChange: this.updateComment.bind(this), id: "body", className: "form-control", type: "text", placeholder: "Add Comment Here", ref: "body" })
							)
						)
					),
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-6" },
							React.createElement(
								"div",
								{ style: { padding: "35px 0 30px 30px" } },
								React.createElement(
									"h3",
									null,
									"Image:"
								),
								React.createElement(
									DropZone,
									{ id: "dropzoneSpot", style: { border: "1px solid white", fontSize: "1.5em" }, onDrop: this.grabImage.bind(this) },
									React.createElement(
										"a",
										{ href: "#dropzoneSpot" },
										"Click to Upload Image ",
										React.createElement("i", { className: "ml-1 no-mr zmdi zmdi-long-arrow-up" })
									)
								)
							)
						),
						React.createElement(
							"div",
							{ className: "col-md-6", style: { paddingRight: 30 } },
							React.createElement(
								"div",
								{ style: { marginTop: 50 } },
								React.createElement("img", { style: { height: 100 }, src: newImage, ref: "imageUrl" })
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
								"a",
								{ className: "pull-right", style: { width: "30%", color: "white", margin: "0 auto" }, onClick: this.submitComment.bind(this), href: "javascript:void(0)", className: "btn btn-primary btn-raised btn-block animate-icon", "data-dismiss": "modal" },
								"Submit Post  ",
								React.createElement("i", { className: "ml-1 no-mr zmdi zmdi-long-arrow-right" })
							)
						)
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