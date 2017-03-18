"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
  list: [],
  map: {},
  appStatus: "ready"

};


module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updated = Object.assign({}, state);

  switch (action.type) {

    case constants.PROFILE_RECEIVED:


      var updatedList = Object.assign([], state.list);
      updatedList.push(action.profile);
      updated.list = updatedList;

      var updatedMap = Object.assign({}, state.map);
      updatedMap[action.profile.username] = action.profile;
      // console.log('username: ' + JSON.stringify(action.profile.username))
      updated.map = updatedMap;

      updated.appStatus = "ready";

      return updated;

    case constants.APPLICATION_STATE:
      // console.log('APPLICATION_STATE: ' + JSON.stringify(action.status))
      if (action.reducer != "profile") {
        return updated;
      }
      updated.appStatus = action.status;
      return updated;

    default:
      return state;
  }
};