"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var Footer = function (props) {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"footer",
			{ className: "ms-footer" },
			React.createElement(
				"div",
				{ className: "container" },
				React.createElement(
					"p",
					null,
					"Copyright © JDRichardsTech 2017"
				)
			)
		)
	);
};

module.exports = Footer;