"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
	map: {},
	appStatus: "ready"
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var updated = Object.assign({}, state);
	var updatedMap = Object.assign({}, updated.map);

	switch (action.type) {
		case constants.COMMENT_UPDATED:


			var list = updatedMap[action.comment.zone];
			var newList = [];

			list.forEach(function (comment, i) {
				if (comment._id == action.comment._id) newList.push(action.comment);else newList.push(comment);
			});

			updatedMap[action.comment.zone] = newList;
			updated.map = updatedMap;

			return updated;

		case constants.COMMENTS_RECEIVED:
			console.log("COMMENTS_RECEIVED: " + JSON.stringify(action.comments));
			//  console.log('zone: ' + JSON.stringify(action.comments[0].zone))
			// let updatedMap = Object.assign({}, updated.map)
			var zoneComments = updatedMap[action.zone._id];
			// updatedMap[action.comments[0].zone] = action.comments
			// console.log('updatedmap: ' + JSON.stringify(updatedMap))
			if (zoneComments == null) zoneComments = [];else zoneComments = Object.assign([], zoneComments);

			action.comments.forEach(function (comment, i) {
				zoneComments.push(comment);
			});
			console.log("zonecomments: " + JSON.stringify(zoneComments));

			updatedMap[action.zone._id] = zoneComments;
			updated.map = updatedMap;

			updated.appStatus = "ready";
			return updated;

		case constants.COMMENT_CREATED:
			console.log("COMMENT_CREATED: " + JSON.stringify(action.comment));

			var commentList = updatedMap[action.comment.zone];
			if (commentList == null) commentList = [];else commentList = Object.assign([], commentList);

			commentList.push(action.comment);

			updatedMap[action.comment.zone] = commentList;
			updated.map = updatedMap;
			updated.appStatus = "ready";
			return updated;

		case constants.SELECT_ZONE:
			//			let updated = Object.assign({}, state)
			return updated;

		case constants.APPLICATION_STATE:
			console.log("APPLICATION_STATE: " + JSON.stringify(action.status));
			if (action.reducer != "comment") {
				return updated;
			}
			updated.appStatus = action.status;
			return updated;

		default:
			return state;

	}
};