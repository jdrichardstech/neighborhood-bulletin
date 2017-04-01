"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var Time = _interopRequire(require("react-time"));

//https://github.com/andreypopp/react-time

module.exports = {
  formattedDate: function (date) {
    var rightNow = Date.now();
    var commentDate = Date.parse(date);
    var twentyFourHours = "86400000";
    if (rightNow - commentDate > twentyFourHours) {
      return React.createElement(Time, { value: date, format: "MMM DD, YYYY" });
    } else {
      return React.createElement(Time, { value: date, titleFormat: "YYYY/MM/DD HH:mm", relative: true });
    }
  }
};