"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var ReactDOM = _interopRequire(require("react-dom"));

var _componentsContainers = require("./components/containers");

var UpdateProfile = _componentsContainers.UpdateProfile;
var UpdateZone = _componentsContainers.UpdateZone;
var _componentsLayout = require("./components/layout/");

var Home = _componentsLayout.Home;
var ProfileInfo = _componentsLayout.ProfileInfo;
var Provider = require("react-redux").Provider;
var store = _interopRequire(require("./stores/store"));

var _reactRouter = require("react-router");

var Router = _reactRouter.Router;
var Route = _reactRouter.Route;
var IndexRoute = _reactRouter.IndexRoute;
var browserHistory = _reactRouter.browserHistory;
var App = (function (Component) {
	function App() {
		_classCallCheck(this, App);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(App, Component);

	_prototypeProperties(App, null, {
		render: {
			value: function render() {
				return React.createElement(
					Provider,
					{ store: store.configureStore() },
					React.createElement(
						Router,
						{ history: browserHistory },
						React.createElement(Route, { path: "/", component: Home }),
						React.createElement(Route, { path: "/profile/:username", component: ProfileInfo }),
						React.createElement(Route, { path: "/updateprofile/", component: UpdateProfile }),
						React.createElement(Route, { path: "/updatezone/:zoneid", component: UpdateZone })
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return App;
})(Component);

module.exports = App;