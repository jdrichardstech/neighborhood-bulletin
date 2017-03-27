import React, { Component } from 'react'
import { APIManager} from '../../utils'
import styles from './styles'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import { Link } from 'react-router'




class Profile extends Component{
  constructor(props){
    super(props)
    this.state={

    }
  }

  componentDidMount(){
    console.log(JSON.stringify(this.props.username))
  		const profile = this.props.profiles[this.props.username]
  		if (profile != null)
  			return

  		this.props.fetchProfile({username: this.props.username})
}


  render(){

        let profile = this.props.profiles[this.props.username]

        var header = null
        if (profile != null){
          header = (
            <div style={{background:'#fff', padding:15}}>
              <h1>Profile Details:</h1>
              <h3>User: <span style={styles.profile.entry}> {profile.username}</span></h3>
              <img src={profile.image} /><br />
              <p>
                Gender: <span style={styles.profile.entry}>{profile.gender}</span><br />
              	City:<span style={styles.profile.entry}> {profile.city}</span><br />
								Bio: {profile.bio}<br />
	            	<Link to ="/"><button style={{marginRight:15}} type="" className="btn btn-info">Home</button></Link>
              </p>
            </div>
          )
        }

        const content = (this.props.appStatus == 'loading') ? 'Loading...' : header

        return (
          <div style={styles.profile.profiledetails}>
            {content}
          </div>
    )

  }
}

const stateToProps = (state) => {
  return{
    profiles: state.profile.map,
    appStatus: state.profile.appStatus
  }
}



const dispatchToProps = (dispatch) => {
  return{
    fetchProfile: (params) => dispatch(actions.fetchProfile(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile)
