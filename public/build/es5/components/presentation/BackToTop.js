"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var BackToTop = function (props) {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"div",
			{ className: "btn-back-top" },
			React.createElement(
				"a",
				{ href: "#", "data-scroll": true, id: "back-top", className: "btn-circle btn-circle-primary btn-circle-sm btn-circle-raised " },
				React.createElement("i", { className: "zmdi zmdi-long-arrow-up" })
			)
		)
	);
};

module.exports = BackToTop;