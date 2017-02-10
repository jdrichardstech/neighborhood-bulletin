import React, { Component } from 'react'
import { Zones, Comments, Account } from '../containers'


class Home extends Component {

	render(){
		return (
			<div>
				<div className="container">

				</div>
				   <div className="clearfix"></div>
				<div className="container">
					<div className="row" style={{marginTop:30}}>

						<div className="col-md-4">
							<Account />
							<Zones />
						</div>
						<div className="col-md-8">
							<Comments />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Home
