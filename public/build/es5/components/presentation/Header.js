"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));






var Header = function (props) {
	return React.createElement(
		"div",
		null,
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
				React.createElement(
					"div",
					{ id: "navbar", className: "navbar-collapse collapse" },
					React.createElement("ul", { className: "nav navbar-nav" })
				)
			)
		)
	);
};

module.exports = Header;