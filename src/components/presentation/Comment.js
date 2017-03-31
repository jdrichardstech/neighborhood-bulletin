import React, { Component } from 'react'
import { Link } from 'react-router'
import { ImageHelper } from '../../utils'
import DropZone from 'react-dropzone'

class Comment extends Component {
constructor(){
	super()
	this.state={
		updated:null,
		picDropped:false,

		isEditing:false,
		showEdit:true
	}
}

componentDidMount(){
	// console.log("Comment ID: " + this.props.currentComment._id)
}

handleEditClick(event){

	this.setState({
		isEditing:true,
		showEdit:false,


	})
}

handleEditChange(event){

let updatedComment = Object.assign({}, this.state.updated)
updatedComment[event.target.id] = event.target.value

this.setState({
	updated: updatedComment,
	picDropped: true
})
}

cancelEdit(event){
	this.setState({
		isEditing:false,
		showEdit:true
	})
}

updateComment(event){
	let updatedComment = Object.assign({}, this.state.updated)

	// console.log("Presentation comment updated: " + JSON.stringify(updatedComment))
	if(this.state.updated!=null){
		this.props.handleSubmitEdit(this.props.currentComment, updatedComment)
	}
	this.setState({
		updated:null,
		isEditing:false,
		showEdit:true,
		picDropped:false
	})
}

grabImage(files){
	console.log('Grab image: '+ JSON.stringify(files))

	let newImage = Object.assign({}, this.state.updated)
	newImage['currectImage'] = files
	this.setState({
		updated:newImage
	})

	this.props.handleImage(files)
}

	render(){
		let newImage =	(this.state.updated == null && this.state.picDropped ==false) ? null : this.props.commentImage
		const currentComment = this.props.currentComment
		const author = currentComment.author
		const radius = 16
		const showEditButton = (this.props.user.username == author.username && this.state.showEdit==true) ?

		<div className="col-lg-4 text-right">
			<a onClick={this.handleEditClick.bind(this)} href="javascript:void(0)" className="btn btn-primary btn-raised btn-block"><i className="ml-1 no-mr zmdi zmdi-edit"></i>&nbsp;&nbsp;Edit
			</a>
		</div>
		: null

		const commentEditingInfo = (this.state.isEditing == true) ?
			<div>
				<div className="row">
				<div className="col-md-12">
				<hr style={{border:'2px solid #03a9f4', background:'#03a9f4', color:'#03a9f4'}} />
				<div style={{padding:30}}>
				<h3>Edit your current comment below:</h3>

				<input  className="form-control" onChange={this.handleEditChange.bind(this)} type="text" placeholder="Change Title" id="title" /> <br />
				<input  className="form-control" onChange={this.handleEditChange.bind(this)} type="text" placeholder="Change Text" id="body"  /> <br />
				</div>
			</div>
		</div>
		<div className="row" >
		<div className="col-md-6" style={{padding:30}}>
			<DropZone style={{border:'1px solid white',fontSize:'1.5em'}} onDrop={this.grabImage.bind(this)}><a onClick={this.handleEditClick.bind(this)} href="javascript:void(0)">
				<i className="ml-1 no-mr zmdi zmdi-camera"></i>&nbsp;Upload New Post Image
			</a></DropZone>
		</div>
			 <div className="col-md-6" style={{padding:30}}>
				 <div style={{marginTop:50}} ><img style={{height:100}} src={newImage} ref="image" /></div>
			 </div>
			 </div>
			 <div className="row">
				 <div className="col-md-12" style={{padding:30}}>
				<div className="row">
					<div className="col-md-6" style={{padding:10}}>
						<a style={{width:'40%', color:'white'}} onClick={this.updateComment.bind(this)} href="javascript:void(0)" className="pull-right btn btn-primary btn-raised btn-block animate-icon">Submit&nbsp;&nbsp;<i className="ml-1 no-mr zmdi zmdi-long-arrow-right"></i>
					 </a>
					</div>
					<div className="col-md-6" style={{padding:10}}>
						<a style={{width:'40%', color:'white'}} onClick={this.cancelEdit.bind(this)} href="javascript:void(0)" className="pull-left btn btn-danger btn-raised btn-block "><i className="ml-1 no-mr zmdi zmdi-close"></i>&nbsp;&nbsp;Cancel
					 </a>
					</div>
					<div className="col-md-6">

					</div>
				</div>




	 				</div>
			 </div>
		 </div>
		:
		<div></div>

		var thisDate = currentComment.timestamp.substr(0,10)
		var year = thisDate.substr(0,4)

		var reverseDate=thisDate.concat('-'+ year)
		var newDate=reverseDate.substr(5,15)
		var time = currentComment.timestamp.substr(11,5)
		var hourDigits = time.substr(0,2)
		var minutes = time.substr(2,3)
		var hour = (hourDigits <=12) ? hourDigits : hourDigits
		var amPm = (hourDigits >= 12) ? 'pm' : 'am'
		var newTime = hour + minutes + amPm
		return (

			<div>
				<article className="card wow fadeInLeft animation-delay-5 mb-4">
					<div className="card-block">
						<div className="row">
							<div className="col-lg-6">
								<img src={currentComment.commentImage} alt="" className="img-responsive mb-4" />
							</div>
							<div className="col-lg-6">
								<h3 className="no-mt" style={{color:'#03a9f4'}}>
									{currentComment.title}
								</h3>
								<p className="mb-4">{currentComment.body}</p>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-8">
								<Link  to = {'/profile/'+ currentComment.username}>
									<img style={{height:50, width:50, borderRadius:25}} src={author.image} alt="..." className="img-circle mr-1" />
								</Link>
								by&nbsp;
								<a  className="ms-tag ms-tag-primary"  href="javascript:void(0)"><Link style={{color:'white'}}  to = {'/profile/'+ currentComment.username}>{currentComment.username}</Link></a>

								<span className="ml-1 hidden-xs">
									<i className="zmdi zmdi-time mr-05 color-info"></i>
									<span className="color-medium-dark">{newTime} | {newDate}</span>
								</span>

							</div>
							<div>
								{showEditButton}
							</div>

							<br />

							<div>
								<br /><br />
								{commentEditingInfo}
							</div>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default Comment
