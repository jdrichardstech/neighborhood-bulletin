import React, { Component } from 'react'
import { APIManager, ImageHelper} from '../../utils'
import styles from './styles'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import { Link } from 'react-router'
import DropZone from 'react-dropzone'
import sha1 from 'sha1'




class UpdateProfile extends Component{
  constructor(props){
    super(props)
    this.state={
				user:null,
        updated:{

        }

    }
  }

  componentDidMount(){


		let updated = Object.assign({}, this.state.user)
		updated = this.props.user
		this.setState({
			user: updated
		})
    // console.log("UpdateProfile Username: " +JSON.stringify(this.props.user._id))
      // console.log("UpdateProfile Profiles: " +JSON.stringify(this.props.user.username))
  		// const profile = this.props.profiles[this.props.username]
  		// if (profile != null)
  		// 	return
      //
      //   APIManager.get('/account/currentuser', null, (err, response)=>{
      //     if(err){
      //       // not logged in, reject
      //       // alert(err)
      //       return
      //     }
      //     // console.log('hi currentuser: ' +JSON.stringify(response))
      //     this.props.currentUserReceived(response.result)
      //   })
      //
  		// this.props.fetchProfile({username: this.props.user.username})
      // this.props.fetchCurrentUser(null)
}
componentDidUpdate(){
	if(this.state.user == null){
		this.props.fetchCurrentUser(null)
		let updated = Object.assign({}, this.state.user)
		updated = this.props.user
		this.setState({
			user: updated
		})
	}

	console.log("componentDidUpdate")
	console.log("PROPS: " + JSON.stringify(this.props.user))

	console.log("componentDidUpdate:" + JSON.stringify(this.state.user))

}

// updateProfile(event){
// let updatedProfile = Object.assign({},this.state.profile)
// updatedProfile[event.target.id] = event.target.value
// this.setState({
//   profile: updatedProfile
// })
// console.log('Update Profile: ' + event.target.id+": "+event.target.value)
// }
updateCurrentUser(event){
  event.preventDefault()
  // console.log('updateCurrentUser: '+event.target.id+' == '+event.target.value)

  let updatedProfile = Object.assign({}, this.state.updated)
  updatedProfile[event.target.id] = event.target.value
  this.setState({
    updated: updatedProfile

  })

}

updateProfile(event){
		event.preventDefault()
		console.log('Update USER PROFILE CONTAINTER: '+JSON.stringify(this.props.user))

		if (Object.keys(this.state.updated).length == 0){
			alert('No Changes Made!!')
			return
		}
console.log("STATE: " + JSON.stringify(this.state.updated))

		this.props.updateProfile(this.props.user, this.state.updated)
		this.setState({
			user:null
		})
		alert("Profile Updated")
	}



  uploadImage(files){
  	const image = files[0]
  	console.log("COMMENT Container Image file: "+JSON.stringify(image))
  	let timestamp = Date.now()/1000
  	const cloudName= 'jdrichardstech'
  	const uploadPreset='qfk6kfpf'
  	const apiSecret = 'e8LAFbk1H23PLU02S5Og2DzsMYQ'
  	const paramStr='timestamp='+timestamp+'&upload_preset='+uploadPreset+'e8LAFbk1H23PLU02S5Og2DzsMYQ'
  	const signature=sha1(paramStr)
  	const apiKey = '854536555581142'
  	const params = {
  		'api_key': apiKey,
  		'timestamp':timestamp,
  		'upload_preset':uploadPreset,
  		'signature': signature
  	}
    const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'
    APIManager.upload(url, image,params,(err, response)=>{
      if(err){
        console.log('Upload err: ' + err.message)
        return
      }
      console.log('Uploaded image: ' + JSON.stringify(response.body))
      const imageUrl = response.body['secure_url']

      let updatedProfile = Object.assign({}, this.state.updated)
      updatedProfile['image'] = response.body['secure_url']
      this.setState({
        updated: updatedProfile
      })
  })
}

  render(){
    const currentUser = this.props.user
    const image = (this.state.updated.image==null) ? '' : ImageHelper.thumbnail(this.state.updated.image, 150)

      return (
        <div style={styles.profile.profiledetails}>
          <h1 style={{color:'white'}}>Update Your Profile</h1><br />
          <div style={styles.profile.container}>

          <h2>Current Profile:</h2>
          <h3>User: <span style={styles.profile.entry}> {this.props.user.username}</span></h3>
          <p>
            Gender: <span style={styles.profile.entry}>{this.props.user.gender}</span><br />
          City:<span style={styles.profile.entry}> {this.props.user.city}</span><br /><br />
        Bio:<span style={styles.profile.entry}> {this.props.user.bio}</span><br /><br />
        Image: <img src={image} /><br /><br />

        <Link to ="/"><button style={{marginRight:10}} type="" className="btn btn-info">Back</button></Link>
        <Link to = {"/profile/"+this.props.user.username}><button type="" className="btn btn-warning">View Current Profile</button></Link>

          </p>
        </div><br /><br />
      <div style={styles.account.container}>
          <label>New Gender:</label>
          <input onChange={this.updateCurrentUser.bind(this)} type="text" className="form-control" id="gender" defaultValue={currentUser.gender} />
          <label>New City:</label>
          <input onChange={this.updateCurrentUser.bind(this)} type="text" className="form-control" id="city" defaultValue={currentUser.city} />
          <label>Bio:</label>
          <textarea  onChange={this.updateCurrentUser.bind(this)} type="text" className="form-control" id="bio" defaultValue={currentUser.bio} ></textarea>
          <br />
          <label>Upload or Drop Image below:</label>
          <DropZone onDrop={this.uploadImage.bind(this)}/>
          <br />
          <button onClick={this.updateProfile.bind(this)} className="btn btn-danger" type="submit">Update Profile</button>
        </div>
        </div>
      )

  }
}

const stateToProps = (state) => {
  return{
    // profiles: state.profile.map,
    appStatus: state.profile.appStatus,
    user:state.account.user
  }
}



const dispatchToProps = (dispatch) => {
  return{
    fetchProfile: (params) => dispatch(actions.fetchProfile(params)),
    updateProfile:(profile, updated)=> dispatch(actions.updateProfile(profile, updated)),
    fetchCurrentUser:(params) => dispatch(actions.fetchCurrentUser(params)),
    currentUserUpdated: (user) => dispatch(actions.currentUserUpdated(user)),
    currentUserReceived: (user) => dispatch(actions.currentUserReceived(user))
  }
}

export default connect(stateToProps, dispatchToProps)(UpdateProfile)
