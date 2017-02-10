import React, { Component } from 'react'
import DropZone from 'react-dropzone'



class CreateComment extends Component {
	constructor(){
		super()
		this.state = {
			key:1,
			picDropped:false,
			comment: {
				commentImage:null,
				body:'',

			}
		}
	}



	grabImage(files){
		console.log('Grab image: '+ JSON.stringify(files))
		let newImage = Object.assign({},this.state.comment)
		newImage['commentImage']=files

		console.log("GRABBED: " + JSON.stringify(this.state.commentImage))
		this.props.handleImage(files)
		this.setState({
			commentImage: newImage,
			picDropped:true
		})
	}

	updateComment(event){
//		console.log('updateComment: ' + event.target.id + ' == ' + event.target.value)
		let updatedComment = Object.assign({}, this.state.comment)
		updatedComment[event.target.id] = event.target.value
		this.setState({
			comment: updatedComment
		})
	}

	submitComment(event){
		console.log('submitComment: '+JSON.stringify(this.state.comment))
		this.props.onCreate(this.state.comment)
		this.setState({
			commentImage:null,
			picDropped:false
		})

	}

	handleSelect(key) {
	 alert('selected ' + key);
	 this.setState({key});
 }

	render(){
		let newImage =	(this.state.comment.commentImage == null && this.state.picDropped !=true) ? null : <img style={{width:100, height:100}} src={this.props.commentImage} />


		return (

			<div>
				<h4>Create Comment</h4>
				<div className="row">
					<div className="col-md-12">
						<input onChange={this.updateComment.bind(this)} id="body" className="form-control" type="text" placeholder="Comment" /><br />
					</div>
				</div>
			<div className="row">
				<div className="col-md-6">
					<DropZone  onDrop={this.grabImage.bind(this)} >
						<div style={{width:150, height:150, border:'1px groove #E6E7F5',borderRadius:5, margin:'25px auto',padding:30}}><center><a href="#">Click here <br /> or drag and drop your image in this box</a></center></div>

					</DropZone><br />
				</div>
				<div className="col-md-6">
					<br /><br />{newImage} <br />
				</div>
			</div>
	
				<button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>

		</div>

		)
	}
}

export default CreateComment
