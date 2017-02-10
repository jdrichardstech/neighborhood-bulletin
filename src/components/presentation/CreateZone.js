import React, { Component } from 'react'

class CreateZone extends Component {
	constructor(){
		super()
		this.clearValues=this.clearValues.bind(this)
		this.state = {

			zone: {
				username:''
			}
		}
	}

	updateZone(event){
		let updated = Object.assign({}, this.state.zone)
		updated[event.target.id] = event.target.value

		this.setState({
			zone: updated
		})
	}

	submitZone(event){

		let updated = Object.assign({}, this.state.zone)
		updated['zipCodes'] = updated.zipCode.split(',')
		this.props.onCreate(updated)
		this.clearValues()

	}

	clearValues(){
		this.refs.name.value=''
		this.refs.zip.value-''
	}


	render(){
		return (
			<div>
				<h4>Create Neighborhood:</h4>
				<label>Neighborhood:</label>
				<input id="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" ref="name" /><br />
				<label>Zip Code:</label>
				<input id="zipCode" onChange={this.updateZone.bind(this)} className="form-control" type="text" ref="zip" /><br />
				<button onClick={this.submitZone.bind(this)} className="btn btn-info">Add Neighborhood</button>
			</div>
		)
	}
}

export default CreateZone
