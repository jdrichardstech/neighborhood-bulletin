import React, { Component } from 'react'
import { Link } from 'react-router'
import { ImageHelper } from '../../utils'
import DropZone from 'react-dropzone'

class Comment extends Component {
constructor(){
	super()
	this.state={
		updated:null,

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
		showEdit:false

	})
}

handleEditChange(event){

let updatedComment = Object.assign({}, this.state.updated)
updatedComment[event.target.id] = event.target.value

this.setState({
	updated: updatedComment
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
		showEdit:true
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
		const currentComment = this.props.currentComment
		const author = currentComment.author
		const radius = 16

		const showEditButton = (this.props.user.username == author.username && this.state.showEdit==true) ?

			<div className="col-lg-4 text-right">
				<a onClick={this.handleEditClick.bind(this)} href="javascript:void(0)" className="btn btn-primary btn-raised btn-block animate-icon">Edit
					<i className="ml-1 no-mr zmdi zmdi-long-arrow-right"></i>
				</a>
			</div>

		: null



		const commentEditingInfo = (this.state.isEditing == true) ?

		<div>


			<label>Edit Comment: </label><br />
			<textarea style={{border:'1px solid #D0D3DB',width:'100%',paddingLeft:15}} className="form-control" onChange={this.handleEditChange.bind(this)} type="text" defaultValue={currentComment.body} id="body" ></textarea> <br />

		<label>Edit Image</label>
	 <DropZone style={{border:'1px solid #fff'}} onDrop={this.grabImage.bind(this)} >
			 <div style={{width:150, height:150, border:'1px inset #D0D3DB',borderRadius:5, margin:'15px auto',padding:15}}><center><a href="#">To upload<br />Click here or drag and drop image here </a></center></div>
			 </DropZone> <br />
			 <br />

			 <div className="col-md-6">
				 <div style={{marginTop:50}} ><img style={{height:100}} src={this.props.commentImage} /></div>
			 </div>

		<button style={{marginTop:10}} className="btn btn-danger" onClick={this.updateComment.bind(this)}>Submit</button>
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
								<h3 className="no-mt">
									<a href="javascript:void(0)">Create A Title In Model</a>
								</h3>
								<p className="mb-4">{currentComment.body}</p>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-8">
								<Link  to = {'/profile/'+ currentComment.username}><img src={author.image} alt="..." className="img-circle mr-1" /></Link> by
								<a href="javascript:void(0)"><Link  to = {'/profile/'+ currentComment.username}>{currentComment.username}</Link></a> in
								<a href="javascript:void(0)" className="ms-tag ms-tag-info">Design</a>
								<span className="ml-1 hidden-xs">
									<i className="zmdi zmdi-time mr-05 color-info"></i>
									<span className="color-medium-dark">{newTime} | {newDate}</span>
								</span>

							</div>
							{showEditButton}

							<div>
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
