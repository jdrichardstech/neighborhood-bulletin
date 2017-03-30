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


			<div className="card card-primary animated fadeInUp animation-delay-7">
				<div className="card-header">
					<h3 className="card-title">
						<i className="zmdi zmdi-widgets"></i> Create Neighborhood</h3>
				</div>
				<div className="card-block">

					<input style={{width:'75%',fontSize:'1.1em'}} id="name" placeholder="Enter Neighborhood Name" ref="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" ref="name" />

					<input style={{width:'75%',fontSize:'1.1em'}} placeholder="Enter Zip Code" id="zipCode" ref="zipCode" onChange={this.updateZone.bind(this)} className="form-control" type="text" ref="zip" /><br />
						<a onClick={this.submitZone.bind(this)} href="javascript:void(0)" className="btn btn-success btn-raised btn-block">
							<i className="ml-1 no-mr zmdi zmdi-home"></i>&nbsp;&nbsp;Add 	New Neighborhood
						</a>
				</div>
			</div>

		)
	}
}

export default CreateZone
