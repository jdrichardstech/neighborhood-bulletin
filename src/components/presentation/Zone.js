import React, { Component } from 'react'
import styles from './styles'
import { Link } from 'react-router'

class Zone extends Component {

	onSelectTitle(event){
		event.preventDefault()
		console.log('onSelectTitle: '+this.props.index)
		this.props.select(this.props.index)
	}




	render(){

		const zoneStyle = styles.zone
		const zipCode = this.props.currentZone.zipCodes[0]
		const title = (this.props.isSelected) ? <a style={zoneStyle.title} href="#">{this.props.currentZone.name}</a> : <a href="#">{this.props.currentZone.name}</a>
	const button = (this.props.currentZone.username == this.props.username) ? <Link to={'/updatezone/'+this.props.currentZone._id}> <button style={{marginTop:10}} className="btn btn-warning">Update Zone</button></Link> : null
		return (
			<div style={styles.zone.li}>
				<h4 onClick={this.onSelectTitle.bind(this)} style={zoneStyle.header}>
					{ title }
				</h4>
				<span className="detail">{zipCode}</span>
			{/*	<span className="detail">{this.props.currentZone.username}</span><br />*/}


			</div>
		)
	}
}

export default Zone
