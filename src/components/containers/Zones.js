import React, { Component } from 'react';
import { CreateZone, Zone } from '../presentation';
import styles from './styles';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import store from '../../stores/store';

class Zones extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // console.log('componentDidMount: '+JSON.stringify(this.props.user))
    this.props.fetchZone(null);
  }

  addZone(zone) {
    if (this.props.user == null) {
      swal({
        title: 'Error!',
        text: 'No Zone Entered',
        type: 'error'
      });
      return;
    }

    let updatedZone = Object.assign({}, zone);
    updatedZone['username'] = this.props.user.username;
    console.log('user: ' + JSON.stringify(updatedZone));

    APIManager.post('/api/zone', updatedZone, (err, response) => {
      if (err) {
        swal({
          title: 'Error!',
          text: err.message,
          type: 'error'
        });
        return;
      }

      this.props.zoneCreated(response.result);
    });
    // this.props.createZone(updatedZone)
  }

  selectZone(index) {
    // console.log('selectZone: '+index)
    // console.log('Hi current user: '+ this.props.user.username)
    // console.log('Hi zone user: '+ this.props.list[this.props.selected].username)
    this.props.selectZone(index);
  }

  render() {
    let header = null;
    let listItems = null;

    if (this.props.user != null) {
      listItems = this.props.list.map((zone, i) => {
        let selected = i == this.props.selected;
        return (
          <li style={{ marginTop: 15 }} role="presentation" key={i}>
            <Zone
              index={i}
              username={this.props.user.username}
              select={this.selectZone.bind(this)}
              isSelected={selected}
              currentZone={zone}
            />
          </li>
        );
      });

      // let update = (this.props.user.username == this.props.list[this.props.selected].username) ? "Button" : "NoButton"
      header = (
        <div>
          <div>
            <div className="card card-primary animated fadeInUp animation-delay-7">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="zmdi zmdi-apps" /> Neighborhoods
                </h3>
              </div>
              <div className="tab-content">
                <div
                  role="tabpanel"
                  className="tab-pane fade active in"
                  id="favorite"
                >
                  <div className="card-block">
                    <h4>Select Neighborhood to view comments</h4>
                    <div className="ms-media-list">
                      <ul style={{ listStyle: 'none' }}>{listItems}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: 'white' }}>
            <CreateZone onCreate={this.addZone.bind(this)} />
          </div>
        </div>
      );
    } else {
      header = <div />;
    }

    let content = this.props.appStatus == 'loading' ? 'Loading...' : header;

    return <div>{content}</div>;
  }
}

const stateToProps = state => {
  return {
    list: state.zone.list,
    selected: state.zone.selectedZone,
    appStatus: state.zone.appStatus,
    user: state.account.user
  };
};

const dispatchToProps = dispatch => {
  return {
    fetchZone: params => dispatch(actions.fetchZone(params)),
    // zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
    zoneCreated: zone => dispatch(actions.zoneCreated(zone)),
    createZone: params => dispatch(actions.createZone(params)),
    selectZone: index => dispatch(actions.selectZone(index))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Zones);
