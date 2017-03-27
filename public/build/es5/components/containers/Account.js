"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var connect = require("react-redux").connect;
var styles = _interopRequire(require("./styles"));

var actions = _interopRequire(require("../../actions/actions"));

var store = _interopRequire(require("../../stores/store"));

var Link = require("react-router").Link;
var DropZone = _interopRequire(require("react-dropzone"));

var sha1 = _interopRequire(require("sha1"));

var Account = (function (Component) {
  function Account(props) {
    _classCallCheck(this, Account);

    _get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this, props);
    this.clearValues = this.clearValues.bind(this);
    this.state = {
      user: {},
      username: "",
      password: ""
    };
  }

  _inherits(Account, Component);

  _prototypeProperties(Account, null, {
    componentDidMount: {
      value: function componentDidMount() {},
      writable: true,
      configurable: true
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {},
      writable: true,
      configurable: true
    },
    updateProfile: {
      value: function updateProfile(event) {
        event.preventDefault();
        // console.log('updateProfile: ' + event.target.id + event.target.value)
        var updatedProfile = Object.assign({}, this.state.profile);
        updatedProfile[event.target.id] = event.target.value;
        this.setState({
          profile: updatedProfile
        });
      },
      writable: true,
      configurable: true
    },
    login: {
      value: function login(event) {
        event.preventDefault();
        // console.log("Sign in:" + JSON.stringify(this.state.profile))
        this.clearValues();
        if (this.state.profile.username.length == 0) {
          alert("you must enter a username");
          return;
        }
        if (this.state.profile.password.length == 0) {
          alert("you must enter password");
          return;
        }

        console.log("user from Account.js: " + JSON.stringify(this.state.profile));
        // APIManager.post('/account/login', this.state.profile, (err, response)=>{
        //   if(err){
        //
        //     alert(err.message)
        //     return
        //   }
        //   console.log("This.state.profile: " + JSON.stringify(this.state.profile))
        //   this.props.currentUserReceived(response.user)
        //   // this.props.fetchCurrentUser(response.user)
        // })
        this.props.createLogin(this.state.profile);

      },
      writable: true,
      configurable: true
    },
    signUp: {
      value: function signUp(event) {
        event.preventDefault();
        console.log("Sign Up:" + JSON.stringify(this.state.profile));
        if (this.state.profile.username.length == 0) {
          alert("you must enter a username");
          return;
        }
        if (this.state.profile.password.length == 0) {
          alert("you must enter password");
          return;
        }



        // APIManager.post('/account/register', this.state.profile, (err, response)=>{
        //   if(err){
        //     alert('Username Taken. Choose another UserName')
        //     return
        //   }
        //   console.log("post 2nd step: " + JSON.stringify(response))
        //   this.props.currentUserReceived(response.user)
        //   // this.props.fetchCurrentUser(response.user)
        // })
        // console.log("Sign Up:" + JSON.stringify(this.state.profile))
        this.props.createSignUp(this.state.profile);
      },
      writable: true,
      configurable: true
    },
    logout: {
      value: function logout(event) {
        var _this = this;
        APIManager.get("/account/logout", null, function (err, response) {
          if (err) {
            alert(err.message);
            return;
          }
          // this.props.fetchCurrentUser(response.result)
          _this.props.currentUserReceived(null);
          _this.clearValues();
        });
      },
      writable: true,
      configurable: true
    },
    uploadImage: {
      value: function uploadImage(files) {
        var _this = this;
        var image = files[0];
        console.log("COMMENT Container Image file: " + JSON.stringify(image));
        var timestamp = Date.now() / 1000;
        var cloudName = "jdrichardstech";
        var uploadPreset = "qfk6kfpf";
        var apiSecret = "e8LAFbk1H23PLU02S5Og2DzsMYQ";
        var paramStr = "timestamp=" + timestamp + "&upload_preset=" + uploadPreset + "e8LAFbk1H23PLU02S5Og2DzsMYQ";
        var signature = sha1(paramStr);
        var apiKey = "854536555581142";
        var params = {
          api_key: apiKey,
          timestamp: timestamp,
          upload_preset: uploadPreset,
          signature: signature
        };
        var url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
        APIManager.upload(url, image, params, function (err, response) {
          if (err) {
            console.log("Upload err: " + err.message);
            return;
          }
          console.log("Uploaded image: " + JSON.stringify(response.body));
          var imageUrl = response.body.secure_url;

          var updatedProfile = Object.assign({}, _this.state.profile);
          updatedProfile.image = response.body.secure_url;
          _this.setState({
            profile: updatedProfile
          });
        });
      },
      writable: true,
      configurable: true
    },
    clearValues: {
      value: function clearValues() {
        this.refs.use.value = "";
        this.refs.pass.value = "";
        this.refs.username.value = "";
        this.refs.password.value = "";
        this.refs.gender.value = "";
        this.refs.city.value = "";
        this.refs.bio.value = "";
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        // let contentFiller = null
        var content = null;
        if (this.props.user == null) {
          content = React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { style: styles.comment.commentsBox },
              React.createElement(
                "h3",
                null,
                "Login"
              ),
              React.createElement(
                "label",
                null,
                "Username:"
              ),
              React.createElement("input", { className: "form-control", onChange: this.updateProfile.bind(this), onChange: this.updateProfile.bind(this), id: "username", type: "text", ref: "use" }),
              React.createElement("br", null),
              React.createElement(
                "label",
                null,
                "Password:"
              ),
              React.createElement("input", { className: "form-control", onChange: this.updateProfile.bind(this), onChange: this.updateProfile.bind(this), id: "password", type: "password", ref: "pass" }),
              React.createElement("br", null),
              React.createElement(
                "button",
                { className: "btn btn-info", onClick: this.login.bind(this), type: "submit" },
                "Log In"
              ),
              React.createElement("br", null)
            ),
            React.createElement(
              "div",
              { style: styles.comment.accountBox },
              React.createElement(
                "h3",
                null,
                "Sign Up:"
              ),
              React.createElement(
                "label",
                null,
                "Username:"
              ),
              React.createElement("input", { className: "form-control", onChange: this.updateProfile.bind(this), id: "username", type: "text", ref: "username" }),
              React.createElement("br", null),
              React.createElement(
                "label",
                null,
                "Password:"
              ),
              React.createElement("input", { className: "form-control", onChange: this.updateProfile.bind(this), id: "password", type: "password", ref: "password" }),
              React.createElement("br", null),
              React.createElement(
                "label",
                null,
                "Gender:"
              ),
              React.createElement("input", { className: "form-control", onChange: this.updateProfile.bind(this), id: "gender", type: "text", ref: "gender" }),
              React.createElement("br", null),
              React.createElement(
                "label",
                null,
                "City:"
              ),
              React.createElement("input", { className: "form-control", onChange: this.updateProfile.bind(this), id: "city", type: "text", ref: "city" }),
              React.createElement("br", null),
              React.createElement(
                "label",
                null,
                "Bio:"
              ),
              React.createElement("textarea", { onChange: this.updateProfile.bind(this), type: "text", className: "form-control", id: "bio", ref: "bio" }),
              React.createElement("br", null),
              React.createElement(
                DropZone,
                { style: { color: "blue" }, onDrop: this.uploadImage.bind(this) },
                React.createElement(
                  "a",
                  null,
                  "Add Profile Image"
                )
              ),
              React.createElement("br", null),
              React.createElement(
                "button",
                { className: "btn btn-info", onClick: this.signUp.bind(this), type: "submit" },
                "Join"
              )
            )
          );
        } else {
          content = React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              null,
              React.createElement("img", { style: { borderRadius: 36, float: "left", marginRight: 12 }, src: ImageHelper.thumbnail(this.props.user.image, 72) }),
              React.createElement(
                "h3",
                null,
                "Hi ",
                React.createElement(
                  "span",
                  { style: { color: "blue" } },
                  React.createElement(
                    Link,
                    { to: "/profile/" + this.props.user.username },
                    this.props.user.username
                  )
                )
              ),
              React.createElement(
                "p",
                null,
                "Gender: ",
                this.props.user.gender
              ),
              React.createElement("br", null),
              React.createElement("br", null),
              React.createElement(
                "button",
                { style: styles.account.button, className: "btn btn-danger", onClick: this.logout.bind(this) },
                "Log Out"
              ),
              " ",
              React.createElement(
                Link,
                { to: "/updateprofile/" + this.props.user.username },
                React.createElement(
                  "button",
                  { style: styles.account.button, className: "btn btn-warning", type: "" },
                  "Update Profile"
                )
              )
            )
          );
        }

        {}
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "col-md-12", style: styles.account.accountBox },
            content
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Account;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user
  };

};

var dispatchToProps = function (dispatch) {
  return {
    currentUserReceived: function (user) {
      return dispatch(actions.currentUserReceived(user));
    },
    fetchCurrentUser: function (params) {
      return dispatch(actions.fetchCurrentUser(params));
    },
    fetchZone: function (params) {
      return dispatch(actions.fetchZone(params));
    },
    createLogin: function (params) {
      return dispatch(actions.createLogin(params));
    },
    createSignUp: function (params) {
      return dispatch(actions.createSignUp(params));
    }

  };
};


module.exports = connect(stateToProps, dispatchToProps)(Account);
// console.log("account componentDidMount")

// console.log("USER: " + JSON.stringify(updated))
// console.log('account componentDidUpdate')
// console.log("PROPS: " + JSON.stringify(this.props.user))
//
// console.log("STATE: " + JSON.stringify(this.state.user))

// APIManager.get('/account/currentuser', null, (err, response)=>{
//   if(err){
//     // not logged in, reject
//     // alert(err)
//     return
//   }
//   // console.log('hi currentuser: ' +JSON.stringify(response))
//   this.props.currentUserReceived(response.result)
// })

// this.props.fetchZone(null)

/*  let content = (this.props.appStatus=='loading') ? 'Loading...' : contentFiller*/