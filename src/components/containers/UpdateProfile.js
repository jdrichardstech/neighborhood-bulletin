import React, { Component } from 'react';
import { APIManager, ImageHelper } from '../../utils';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import { Link } from 'react-router';
import DropZone from 'react-dropzone';
import sha1 from 'sha1';
import { Header, Footer, BackToTop } from '../presentation';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      updated: {}
    };
  }

  componentDidMount() {
    let updated = Object.assign({}, this.state.user);
    updated = this.props.user;
    this.setState({
      user: updated
    });
  }
  componentDidUpdate() {
    if (this.state.user == null) {
      this.props.fetchCurrentUser(null);
      let updated = Object.assign({}, this.state.user);
      updated = this.props.user;
      this.setState({
        user: updated
      });
    }
  }

  updateCurrentUser(event) {
    event.preventDefault();
    // console.log('updateCurrentUser: '+event.target.id+' == '+event.target.value)
    let updatedProfile = Object.assign({}, this.state.updated);
    updatedProfile[event.target.id] = event.target.value;
    this.setState({
      updated: updatedProfile
    });
  }

  updateProfile(event) {
    event.preventDefault();

    if (Object.keys(this.state.updated).length == 0) {
      swal({
        title: 'Error!',
        text: 'No Changes Made',
        type: 'error'
      });
      return;
    }

    this.props.updateProfile(this.props.user, this.state.updated);
    this.setState({
      user: null
    });
    swal({
      title: 'Success!',
      text: 'Profile Updated',
      type: 'success'
    });
  }

  uploadImage(files) {
    const image = files[0];
    console.log('COMMENT Container Image file: ' + JSON.stringify(image));
    let timestamp = Date.now() / 1000;
    const cloudName = 'jdrichardstech';
    const uploadPreset = 'qfk6kfpf';
    const apiSecret = 'e8LAFbk1H23PLU02S5Og2DzsMYQ';
    const paramStr =
      'timestamp=' +
      timestamp +
      '&upload_preset=' +
      uploadPreset +
      'e8LAFbk1H23PLU02S5Og2DzsMYQ';
    const signature = sha1(paramStr);
    const apiKey = '854536555581142';
    const params = {
      api_key: apiKey,
      timestamp: timestamp,
      upload_preset: uploadPreset,
      signature: signature
    };
    const url =
      'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload';
    APIManager.upload(url, image, params, (err, response) => {
      if (err) {
        console.log('Upload err: ' + err.message);
        return;
      }
      console.log('Uploaded image: ' + JSON.stringify(response.body));
      const imageUrl = response.body['secure_url'];

      let updatedProfile = Object.assign({}, this.state.updated);
      updatedProfile['image'] = response.body['secure_url'];
      this.setState({
        updated: updatedProfile
      });
    });
  }

  render() {
    let content = null;
    let image = null;

    const currentUser = this.props.user;

    content = (
      <div>
        <div className="ms-hero-page-override ms-hero-img-city ms-bg-fixed ms-hero-bg-primary">
          <div className="container">
            <div className="text-center mt-2" style={{ paddingTop: 75 }}>
              <h1 className="color-white mt-4 animated fadeInUp animation-delay-10">
                Profile Page
              </h1>
              <img
                src={currentUser.image}
                className="ms-avatar-hero animated zoomIn animation-delay-7"
              />
              <h1 className="color-white mt-4 animated fadeInUp animation-delay-10">
                {currentUser.firstName} {currentUser.lastName}
              </h1>
              <h3 className="color-medium no-mb animated fadeInUp animation-delay-10">
                {currentUser.bio}
              </h3>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card-block">
                <h2
                  className="color-primary no-mb"
                  style={{ textAlign: 'center', padding: '20px 0 20px 0' }}
                >
                  Your Current Information
                </h2>

                <table
                  className="table table-no-border table-striped"
                  style={{ width: '65%', margin: '0 auto 50px auto' }}
                >
                  <tbody>
                    <tr>
                      <th>
                        <i className="zmdi zmdi-face mr-1 color-warning" />{' '}
                        Fullname
                      </th>
                      <td>
                        {currentUser.firstName} {currentUser.lastName}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <i className="zmdi zmdi-account mr-1 color-royal" />{' '}
                        User Name
                      </th>
                      <td>{currentUser.username}</td>
                    </tr>
                    <tr>
                      <th>
                        <i className="zmdi zmdi-male-female mr-1 color-success" />{' '}
                        Gender
                      </th>
                      <td>{currentUser.gender}</td>
                    </tr>
                    <tr>
                      <th>
                        <i className="zmdi zmdi-email mr-1 color-primary" />{' '}
                        Email
                      </th>
                      <td>
                        <a href="#">
                          {currentUser.username}
                          @me.com
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <i className="zmdi zmdi-link mr-1 color-danger" />{' '}
                        Website
                      </th>
                      <td>
                        <a href="#">
                          www.
                          {currentUser.username}
                          .com
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <Link to="/">
                    <button
                      style={{ margin: '0 auto 100px auto', width: '25%' }}
                      type=""
                      className="btn btn-success  btn-raised btn-block"
                    >
                      <i className="ml-1 no-mr zmdi zmdi-home" />
                      &nbsp;&nbsp;Home
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-block">
                <h2 style={{ textAlign: 'center', padding: '20px 0 20px 0' }}>
                  Update Your Info
                </h2>
                <div style={{ width: '65%', margin: '0 auto 50px auto' }}>
                  <label>First Name:</label>
                  <input
                    onChange={this.updateCurrentUser.bind(this)}
                    type="text"
                    className="form-control"
                    id="firstName"
                    defaultValue={currentUser.firstName}
                  />
                  <label>Last Name:</label>
                  <input
                    onChange={this.updateCurrentUser.bind(this)}
                    type="text"
                    className="form-control"
                    id="lastName"
                    defaultValue={currentUser.lastName}
                  />
                  <label>New Gender:</label>
                  <input
                    onChange={this.updateCurrentUser.bind(this)}
                    type="text"
                    className="form-control"
                    id="gender"
                    defaultValue={currentUser.gender}
                  />
                  <label>New City:</label>
                  <input
                    onChange={this.updateCurrentUser.bind(this)}
                    type="text"
                    className="form-control"
                    id="city"
                    defaultValue={currentUser.city}
                  />
                  <label>Bio:</label>
                  <input
                    onChange={this.updateCurrentUser.bind(this)}
                    type="text"
                    className="form-control"
                    id="bio"
                    defaultValue={currentUser.bio}
                  />
                  <br />
                  <DropZone
                    style={{ border: '1px solid white', fontSize: '1.5em' }}
                    nDrop={this.uploadImage.bind(this)}
                  >
                    <a href="javascript:void(0)">
                      <i className="ml-1 no-mr zmdi zmdi-camera" />
                      &nbsp;Upload New Profile Image
                    </a>
                  </DropZone>

                  <br />
                  <button
                    onClick={this.updateProfile.bind(this)}
                    className="btn btn-warning  btn-raised btn-block"
                    type="submit"
                  >
                    <i className="ml-1 no-mr zmdi zmdi-face" />
                    &nbsp;&nbsp;Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div className="sb-site-container" style={{ background: '#fff' }}>
        <Header />
        {content}
        <BackToTop />
        <Footer />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    appStatus: state.profile.appStatus,
    user: state.account.user
  };
};

const dispatchToProps = dispatch => {
  return {
    fetchProfile: params => dispatch(actions.fetchProfile(params)),
    updateProfile: (profile, updated) =>
      dispatch(actions.updateProfile(profile, updated)),
    fetchprofile: params => dispatch(actions.fetchprofile(params)),
    profileUpdated: user => dispatch(actions.profileUpdated(user)),
    profileReceived: user => dispatch(actions.profileReceived(user)),
    fetchCurrentUser: params => dispatch(actions.fetchCurrentUser(params)),
    currentUserUpdated: user => dispatch(actions.currentUserUpdated(user))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(UpdateProfile);
