import React, { Component } from 'react'
import { CreateZone, Zone} from '../presentation'
import styles from './styles'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import store from '../../stores/store'


class Zones extends Component {
	constructor(){
		super()
		this.state = {

		}
	}

	componentDidMount(){
		console.log('componentDidMount: '+JSON.stringify(this.props.user))
		// APIManager.get('/api/zone', null, (err, response) => {
		// 	if (err){
		// 		alert('ERROR: '+err.message)
		// 		return
		// 	}
		//
		// 	// ACTION!
			// const zones = response.results
			// this.props.zonesReceived(zones)
		// })

		this.props.fetchZone(null)
	}


	addZone(zone){
		if(this.props.user == null){
			alert('no zone')
			return
		}

		let updatedZone = Object.assign({}, zone)
		updatedZone['username']= this.props.user.username
			console.log('user: '+JSON.stringify(updatedZone))

		APIManager.post('/api/zone', updatedZone, (err, response) => {
			if (err){
				alert('ERROR: '+err.message)
				return
			}

			this.props.zoneCreated(response.result)
		})
		// this.props.createZone(updatedZone)
	}

	selectZone(index){
		// console.log('selectZone: '+index)
		// console.log('Hi current user: '+ this.props.user.username)
		// console.log('Hi zone user: '+ this.props.list[this.props.selected].username)
		this.props.selectZone(index)
	}

	render(){

	let header = null
	let listItems = null

	if(this.props.user !=null){
		 listItems = this.props.list.map((zone, i) => {
			let selected = (i==this.props.selected)
			return (
				<li key={i}>
					<Zone index={i} username={this.props.user.username} select={this.selectZone.bind(this)} isSelected={selected} currentZone={zone} />
				</li>
			)
		})


		// let update = (this.props.user.username == this.props.list[this.props.selected].username) ? "Button" : "NoButton"
		 header = 	<div style={styles.zone.container}>
			 						<h4>Neighborhoods</h4>
										<ul style={styles.zone.ul}>
											{listItems}
										</ul>

										<CreateZone  onCreate={this.addZone.bind(this)} />
									</div>
	}else{
		header = <div>

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
		list: state.zone.list,
		selected: state.zone.selectedZone,
		appStatus: state.zone.appStatus,
		user: state.account.user
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchZone: (params) => dispatch(actions.fetchZone(params)),
		// zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
		zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
		createZone: (params) => dispatch(actions.createZone(params)),
		selectZone: (index) => dispatch(actions.selectZone(index)),
	}
}

export default connect(stateToProps, dispatchToProps)(Zones)
