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
	console.log("Comment ID: " + this.props.currentComment._id)
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
		<div>
			<button onClick={this.handleEditClick.bind(this)} className="btn btn-info">Edit</button>
		</div>
		: null



		const commentInfo = (this.state.isEditing == false) ?
			<div>
				<div className="row" style={{margin:'20px 0'}}>
					<div className="col-md-3" style={{marginLeft:0, paddingLeft:0}}>
						<img style={{height:100, width:100}} src={currentComment.commentImage} />
					</div>
					<div className="col-md-9">
						<p style={{fontSize:15, fontWeight:400, paddingTop:20}}>
						Comment: <br />
						<span style={{color:"blue"}}>	{currentComment.body}</span>
						</p>

					</div>
				</div>

			</div>
		:
		<div style={{marginTop:20}}>
			<div className="row">
				<div className="col-md-12">
			<label>Edit Comment: </label><br />
			<textarea style={{width:'100%'}} className="form-control" onChange={this.handleEditChange.bind(this)} type="text" defaultValue={currentComment.body} id="body" ></textarea> <br /><br />
			</div>
		</div>
		<div className="row">
			<div className="col-md-6">
		<label>Edit Image</label>
	 <DropZone onDrop={this.grabImage.bind(this)} >
			 <div style={{width:150, height:150, border:'1px groove #D0D3DB',borderRadius:5, margin:'25px auto',padding:30}}><center><a href="#">Click here <br /> or drag and drop your image in this box</a></center></div>
			 </DropZone> <br />
			 <br />
			 </div>
			 <div className="col-md-6">
				 <div style={{marginTop:50}} ><img style={{height:100}} src={this.props.commentImage} /></div>
			 </div>
		 </div>
		<button style={{marginTop:10}} className="btn btn-danger" onClick={this.updateComment.bind(this)}>Submit</button>
		</div>

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
					<div>
						{commentInfo}
					</div>
					<div className="pull-right">
						<span>Created By: <span style={{color:'blue'}}>{currentComment.username}</span> at </span>
						<span style={{fontWeight:200}}> {newTime} | {newDate}</span>
						<span style={{fontWeight:200}}>
							<Link  to = {'/profile/'+ currentComment.username}>	<img style={{borderRadius:radius, marginRight:6}} src={ImageHelper.thumbnail(author.image, 2*radius)} /></Link>
						</span>
					</div>
					<div>
						{showEditButton}
					</div>
			</div>

		)
	}
}

export default Comment
