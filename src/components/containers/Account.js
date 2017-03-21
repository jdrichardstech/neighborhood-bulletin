import React, { Component } from 'react'
import { APIManager, ImageHelper } from '../../utils'
import { connect } from 'react-redux'
import styles from './styles'
import actions from '../../actions/actions'
import store from '../../stores/store'
import { Link } from 'react-router'
import DropZone from 'react-dropzone'
import sha1 from 'sha1'

class Account extends Component{
  constructor(props){
    super(props)
    this.clearValues=this.clearValues.bind(this)
    this.state={
      username:'',
      password:''
    }
  }

  componentDidMount(){
    // APIManager.get('/account/currentuser', null, (err, response)=>{
    //   if(err){
    //     // not logged in, reject
    //     // alert(err)
    //     return
    //   }
    //   // console.log('hi currentuser: ' +JSON.stringify(response))
    //   this.props.currentUserReceived(response.result)
    // })
  	this.props.fetchCurrentUser(null)
  }

  updateProfile(event){
    event.preventDefault()
    // console.log('updateProfile: ' + event.target.id + event.target.value)
    let updatedProfile = Object.assign({}, this.state.profile)
    updatedProfile[event.target.id] = event.target.value
    this.setState({
      profile: updatedProfile
    })
  }

  login(event){
    event.preventDefault()
    // console.log("Sign in:" + JSON.stringify(this.state.profile))
    this.clearValues()
    if(this.state.profile.username.length==0){
      alert('you must enter a username')
      return
    }
    if(this.state.profile.password.length==0){
      alert('you must enter password')
      return
    }

    console.log("user from Account.js: " + JSON.stringify(this.state.profile))
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
    this.props.createLogin(this.state.profile)


  }

  signUp(event){
    event.preventDefault()
    console.log("Sign Up:" + JSON.stringify(this.state.profile))
    if(this.state.profile.username.length==0){
      alert('you must enter a username')
      return
    }
    if(this.state.profile.password.length==0){
      alert('you must enter password')
      return
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
    this.props.createSignUp(this.state.profile)
  }

logout(event){
  APIManager.get('/account/logout', null, (err, response)=>{
    if(err){
      alert(err.message)
      return
    }
    // this.props.fetchCurrentUser(response.result)
    this.props.currentUserReceived(null)
    this.clearValues()

  })
    // this.props.fetchZone(null)

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

      let updatedProfile = Object.assign({}, this.state.profile)
      updatedProfile['image'] = response.body['secure_url']
      this.setState({
        profile: updatedProfile
      })
  })
}


clearValues(){
    this.refs.use.value=''
    this.refs.pass.value=''
    this.refs.username.value=''
    this.refs.password.value=''
    this.refs.gender.value=''
    this.refs.city.value=''
    this.refs.bio.value=''
}

  render(){
    // let contentFiller = null
    let content = null
    if(this.props.user==null){
      content = (
        <div >
          <div style={styles.comment.commentsBox}>
            <h3>Login</h3>
            <label>Username:</label>
            <input className="form-control" onChange={this.updateProfile.bind(this)} onChange={this.updateProfile.bind(this)} id="username" type="text" ref="use" /><br />
            <label>Password:</label>
            <input className="form-control" onChange={this.updateProfile.bind(this)} onChange={this.updateProfile.bind(this)} id="password" type="password" ref="pass" /><br />
            <button className="btn btn-info" onClick={this.login.bind(this)} type="submit">Log In</button>
            <br />
          </div>

          <div style={styles.comment.accountBox}>
            <h3>Sign Up:</h3>
            <label>Username:</label>
            <input className="form-control" onChange={this.updateProfile.bind(this)} id="username"  type="text" ref="username"/><br />
            <label>Password:</label>
            <input className="form-control" onChange={this.updateProfile.bind(this)} id="password" type="password" ref="password" /><br />
            <label>Gender:</label>
            <input className="form-control" onChange={this.updateProfile.bind(this)} id="gender" type="text" ref="gender" /><br />
            <label>City:</label>
            <input className="form-control" onChange={this.updateProfile.bind(this)} id="city" type="text" ref="city" /><br />
            <label>Bio:</label>
            <textarea  onChange={this.updateProfile.bind(this)} type="text" className="form-control" id="bio" ref="bio" ></textarea><br />
            <DropZone style={{color:'blue'}} onDrop={this.uploadImage.bind(this)}><a>Add Profile Image</a></DropZone><br />
            <button className="btn btn-info" onClick={this.signUp.bind(this)} type="submit">Join</button>
          </div>
        </div>
      )
    }else{

      content = (
        <div>
	        <div>
	          <img style={{borderRadius:36, float:'left', marginRight:12}} src={ImageHelper.thumbnail(this.props.user.image, 72)} />
	          <h3>Hi <span style={{color:'blue'}}>{this.props.user.username}</span></h3><br /><br />
	          <button style={styles.account.button} className="btn btn-danger" onClick={this.logout.bind(this)}>Log Out</button>
	          &nbsp;<Link to="/updateprofile/"><button style={styles.account.button} className="btn btn-warning" type="">Update Profile</button></Link>
	        </div>
        </div>
      )
    }

  {/*  let content = (this.props.appStatus=='loading') ? 'Loading...' : contentFiller*/}
    return(
      <div>
        <div className="col-md-12" style={styles.account.accountBox}>
          {content}
        </div>
      </div>
    )
  }
}

const stateToProps = (state) =>{
  return{
    user: state.account.user
  }


}

const dispatchToProps = (dispatch) => {
  return{
      currentUserReceived: (user) => dispatch(actions.currentUserReceived(user)),
      fetchCurrentUser: (params) => dispatch(actions.fetchCurrentUser(params)),
      fetchZone: (params) => dispatch(actions.fetchZone(params)),
      createLogin: (params) => dispatch(actions.createLogin(params)),
      createSignUp: (params) => dispatch(actions.createSignUp(params))

  }

}


export default connect(stateToProps, dispatchToProps)(Account)
