import React, { Component } from 'react'
import { APIManager} from '../../utils'
import styles from './styles'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import { Link } from 'react-router'
import {Header, BackToTop, Footer} from '../presentation'

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
				<div>
					<div className="ms-hero-page-override ms-hero-img-city ms-bg-fixed ms-hero-bg-primary">
						<div className="container" >
							<div  className="text-center mt-2" style={{paddingTop:75}}>
								<h1 className="color-white mt-4 animated fadeInUp animation-delay-10">Profile Page</h1>
								<img src={profile.image} className="ms-avatar-hero animated zoomIn animation-delay-7" />
								<h1 className="color-white mt-4 animated fadeInUp animation-delay-10">{profile.username}</h1>
								<h3 className="color-medium no-mb animated fadeInUp animation-delay-10">{profile.bio}</h3>
							</div>
						</div>
					</div>
					<div  className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="card-block">
									<h2  className="color-primary no-mb" style={{textAlign:'center',padding:'20px 0 20px 0'}}>Personal Information</h2>
								</div>
								<table className="table table-no-border table-striped" style={{width:'65%',margin:'0 auto 50px auto'}}>
									<tbody>
										<tr>
											<th>
												<i className="zmdi zmdi-account mr-1 color-royal"></i> User Name</th>
											<td>{profile.username}</td>
										</tr>
										<tr>
											<th>
												<i className="zmdi zmdi-male-female mr-1 color-success"></i> Gender</th>
											<td>{profile.gender}</td>
										</tr>
										<tr>
											<th>
												<i className="zmdi zmdi-email mr-1 color-primary"></i> Email</th>
											<td>
												<a href="#">{profile.username}@me.com</a>
											</td>
										</tr>
										<tr>
											<th>
												<i className="zmdi zmdi-link mr-1 color-danger"></i> Website</th>
											<td>
												<a href="#">www.{profile.username}.com</a>
											</td>
										</tr>
									</tbody>
								</table>
								<Link to ="/"><button style={{margin:'0 auto 100px auto',width:'25%'}} type="" className="btn btn-success  btn-raised btn-block"><i className="ml-1 no-mr zmdi zmdi-home"></i>&nbsp;&nbsp;Home</button></Link>
							</div>
						</div>
					</div>
				</div>
      )
    }

    const content = (this.props.appStatus == 'loading') ? 'Loading...' : header

    return (
			<div>
				<div className="sb-site-container" style={{background:'#fff'}}>
					<Header />
	        {content}
				</div>
				<BackToTop />
				<Footer />
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
