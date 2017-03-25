import React, { Component } from 'react'
import { CreateComment, Comment } from '../presentation'
import styles from './styles'
import { APIManager, ImageHelper } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import DropZone from 'react-dropzone'
import sha1 from 'sha1'

class Comments extends Component {
	constructor(){
		super()
		this.state = {
			updated:{

			},
			commentsLoaded: false,
			index: 0
		}
	}

	submitComment(comment){
		if(this.props.user == null){
			alert('Please Sign Up or Log In')
			return
		}

		let updatedComment = Object.assign({}, comment)
		let zone = this.props.zones[this.props.index]
		updatedComment['commentImage']=this.state.updated.commentImage
		updatedComment['zone'] = zone._id
		updatedComment['username']= this.props.user.username
		updatedComment['author'] = {
		id: this.props.user._id,
		username: this.props.user.username,
		image: this.props.user.image
		}

		this.props.createComment(updatedComment)
	}

	componentDidUpdate(){
		let zone = this.props.zones[this.props.index]
		if (zone == null){
			console.log('NO SELECTED ZONE!!!!')
			return
		}

		let commentsArray = this.props.commentsMap[zone._id]
		if (commentsArray != null) // comments have been already loaded!
			return

		APIManager.get('/api/comment', {zone:zone._id}, (err, response) => {
			if (err){
				alert('ERROR: '+err.message)
				return
			}

			let comments = response.results
			this.props.commentsReceived(comments, zone)
		})
		// this.props.fetchComments({ zone:zone._id})
	}


	submitEdit(comment, updated){
		// console.log('update comment: '+ comment._id+", "+ JSON.stringify(updated))
		updated['commentImage'] = this.state.updated.commentImage
		this.setState({
			commentImage: null
		})
		console.log('Updated Image: ' + JSON.stringify(updated))
		this.props.updateComment(comment, updated)
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
			updatedProfile['commentImage'] = response.body['secure_url']
			this.setState({
				updated: updatedProfile
			})
			// console.log("UPDATED COMMENT:" + JSON.stringify(this.state.updated))
	})
	}

	render(){
		const selectedZone = this.props.zones[this.props.index]
		const image = (this.state.updated.commentImage==null) ? '' : ImageHelper.thumbnail(this.state.updated.commentImage, 22)

		let zoneName = null
		let commentList = null
		let header = null
		if(this.props.user !=null){
			if (selectedZone != null){
				zoneName = selectedZone.name
				let zoneComments = this.props.commentsMap[selectedZone._id]
				// console.log('ZoneComment: ' + JSON.stringify(this.props.commentsMap))
				// console.log('SELECTED ZONE ID = '+selectedZone._id)
				// console.log('COMMENTS MAP = '+JSON.stringify(this.props.commentsMap))
				if (zoneComments != null){
					commentList = zoneComments.map((comment, i) => {
						return (
							<div key={i} className="col-md-12" style={{border:'2px solid #ddd',paddingBottom:10, marginBottom:10}}>
								<li key={i}><Comment commentImage={this.state.updated.commentImage} handleImage={this.uploadImage.bind(this)} handleSubmitEdit={this.submitEdit.bind(this)}  user={this.props.user} currentComment={comment} /></li>
							</div>
						)
					})
				}
			}

			 header =
				<div>
						<div style={styles.comment.commentsBox} className="col-md-12">
							<h2>Neighborhood Bulletin Board</h2>
							<center><img style={{width:690, height:300}} src="/images/neighborhood.jpg" /></center>
								<h3>Comments for <span style={styles.comment.title}>{zoneName}</span>: </h3>
								<ul style={styles.comment.commentsList}>
									{ commentList }
								</ul>
						</div>
						<div style={styles.comment.commentsBox} className="col-md-12">
							<CreateComment commentImage={this.state.updated.commentImage}  handleImage={this.uploadImage.bind(this)}  onCreate={this.submitComment.bind(this)} />
						</div>
				</div>
				}else{
					header =
						<div style={styles.zone.container}>
							<h2>Welcome to Neighborhood Bulletin Board</h2>
							<h3>Please Log In Or Register</h3>
							<center><img style={{width:570, height:300}} src="/images/neighborhood.jpg" /></center>
						</div>
					}

		let content = (this.props.appStatus=='loading') ? 'Loading...' : header

		return (
			<div>
				{content}
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		commentsMap: state.comment.map,
		// comments: state.comment.list,
		commentsLoaded: state.comment.commentsLoaded,
		appStatus: state.comment.appStatus,
		index: state.zone.selectedZone,
		zones: state.zone.list,
		user: state.account.user
	}
}

const dispatchToProps = (dispatch) => {
	return {
		commentsReceived: (comments, zone) => dispatch(actions.commentsReceived(comments, zone)),
		fetchComments: (zone) => dispatch(actions.fetchComments(zone)),
		updateComment:(comment, updated) => dispatch(actions.updateComment(comment, updated)),
		commentCreated: (comment) => dispatch(actions.commentCreated(comment)),
		createComment: (comment) => dispatch(actions.createComment(comment))
	}
}

export default connect(stateToProps, dispatchToProps)(Comments)
