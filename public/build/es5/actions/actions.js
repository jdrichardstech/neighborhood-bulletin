"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var APIManager = require("../utils").APIManager;
module.exports = {

	commentsReceived: function (comments, zone) {
		return {
			type: constants.COMMENTS_RECEIVED,
			comments: comments,
			zone: zone
		};
	},

	// commentCreated: (comment) => {
	// 	return {
	// 		type: constants.COMMENT_CREATED,
	// 		comment: comment
	// 	}
	// },

	createComment: function (comment) {
		return function (dispatch) {
			dispatch({
				type: constants.APPLICATION_STATE,
				status: "loading",
				reducer: "comment"
			});

			APIManager.post("/api/comment", comment, function (err, response) {
				if (err) {
					alert(err);
					return;
				}
				var comment = response.result;
				dispatch({
					type: constants.COMMENT_CREATED,
					comment: comment
				});
			});
		};
	},

	// zonesReceived: (zones) => {
	// 	return {
	// 		type: constants.ZONES_RECEIVED,
	// 		zones: zones
	// 	}
	// },

	zoneCreated: function (zone) {
		return {
			type: constants.ZONE_CREATED,
			zone: zone
		};
	},

	// createZone: (params) => {
	// 	return (dispatch) => {
	// 		dispatch({
	// 			type: constants.APPLICATION_STATE,
	// 			status: 'loading',
	// 			reducer: 'zone'
	// 		})
	//
	// 		APIManager.post('/api/zone', params, (err,response)=>{
	// 			if(err){
	// 				console.log('error: ' + err)
	// 				return
	// 			}
	// 			const zone = response.results
	//
	// 			dispatch({
	// 				type: constants.ZONE_CREATED,
	// 				zone: zone
	// 			})
	// 		})
	// 	}
	// },

	selectZone: function (index) {
		return {
			type: constants.SELECT_ZONE,
			selectedZone: index
		};
	},

	currentUserReceived: function (user) {
		return {
			type: constants.CURRENT_USER_RECEIVED,
			user: user
		};
	},


	fetchCurrentUser: function (params) {
		return function (dispatch) {
			dispatch({
				type: constants.APPLICATION_STATE,
				status: "loading",
				reducer: "account"
			});

			APIManager.get("/account/currentuser", params, function (err, response) {
				if (err) {
					console.log("cannot get current user: " + err.message);
					return;
				}

				var user = response.result;

				dispatch({
					type: constants.CURRENT_USER_RECEIVED,
					user: user
				});
			});
		};
	},

	currentUserUpdated: function (user) {
		return {
			type: constants.CURRENT_USER_UPDATED,
			user: user
		};
	},

	profileReceived: function (profile) {
		return {
			type: constants.PROFILE_RECEIVED,
			profile: profile
		};
	},

	fetchProfile: function (params) {
		return function (dispatch) {
			dispatch({
				type: constants.APPLICATION_STATE,
				status: "loading",
				reducer: "profile"
			});

			APIManager.get("/api/profile", params, function (err, response) {
				if (err) {
					console.log("error: " + err);
					return;
				}
				if (response.results.length == 0) {
					alert("Profile Not Found");
				}
				var profile = response.results[0];

				dispatch({
					type: constants.PROFILE_RECEIVED,
					profile: profile
				});
			});
		};
	},

	fetchZone: function (params) {
		return function (dispatch) {
			dispatch({
				type: constants.APPLICATION_STATE,
				status: "loading",
				reducer: "zone"
			});

			APIManager.get("/api/zone", params, function (err, response) {
				if (err) {
					console.log("error: " + err);
					return;
				}
				var zones = response.results;

				dispatch({
					type: constants.ZONES_RECEIVED,
					zones: zones
				});
			});
		};
	},
	// fetchComments:(zone) => {
	// 	return (dispatch) => {
	//
	//
	//
	// 		APIManager.get('api/comment', zone, (err, response)=>{
	// 			if(err){
	// 				console.log('fetchComments error: ' + err)
	// 				return
	// 			}
	//
	// 			const comments = response.results
	//
	//
	// 			dispatch({
	// 				type: constants.COMMENTS_RECEIVED,
	// 				comments: comments,
	// 				zone: zone
	// 			})
	// 		})
	// 	}
	// },

	createLogin: function (params) {
		return function (dispatch) {
			dispatch({
				type: constants.APPLICATION_STATE,
				status: "loading",
				reducer: "account"
			});

			APIManager.post("/account/login", params, function (err, response) {
				if (err) {
					alert(err.message);
					return;
				}

				var user = response.user;
				console.log("New User Actions: " + JSON.stringify(response.user));
				dispatch({
					type: constants.CURRENT_USER_RECEIVED,
					user: user
				});
			});
		};
	},

	createSignUp: function (params) {
		return function (dispatch) {
			dispatch({
				type: constants.APPLICATION_STATE,
				appStatus: "loading",
				reducer: "account"
			});

			APIManager.post("/account/register", params, function (err, response) {
				if (err) {
					alert("Username Taken. Choose another UserName");
					return;
				}

				var user = response.user;
				dispatch({
					type: constants.CURRENT_USER_RECEIVED,
					user: user
				});
			});
		};
	},

	updateComment: function (comment, updated) {
		return function (dispatch) {
			var endpoint = "/api/comment/" + comment._id;
			console.log("ACTIONS URL ENDPOINT VARIABLE: " + JSON.stringify(endpoint));
			console.log("ACTIONS UPDATED COMMENT: " + JSON.stringify(updated));
			APIManager.put(endpoint, updated, function (err, response) {
				if (err) {
					alert("Comment not updated: " + err.message);
					return;
				}

				var newComment = response.result;
				// console.log("Actions Response: "+ JSON.stringify(response.result))

				dispatch({
					type: constants.COMMENT_UPDATED,
					comment: newComment
				});
			});
		};
	},

	updateProfile: function (profile, updated) {
		return function (dispatch) {
			console.log("UPdate Profile actions:" + JSON.stringify(profile));
			console.log("UPdate updated actions:" + JSON.stringify(updated));

			var endpoint = "/api/profile/" + profile._id;
			APIManager.put(endpoint, updated, function (err, response) {
				if (err) {
					alert("ERROR: " + JSON.stringify(err));
					return;
				}

				//				console.log('Profile Updated: '+JSON.stringify(response))
				var updatedProfile = response.result;
				console.log("Profile Updated Actions: " + JSON.stringify(response.result));
			});
		};
	}
};
// console.log("Login: " + JSON.stringify(response))
// this.props.currentUserReceived(response.user)
// this.props.fetchCurrentUser(response.user)
// dispatch({
// 	type: constants.PROFILE_UPDATED,
// 	profile: updatedProfile
// })