import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { UpdateProfile, UpdateZone } from './components/containers'
import {Home, ProfileInfo } from './components/layout/'
import { Provider } from 'react-redux'
import store from './stores/store'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'


class App extends Component{
	render(){
		return(
			<Provider store={ store.configureStore()}>
				<Router history={browserHistory}>
					<Route path="/" component={Home}></Route>
					<Route path="/profile/:username" component={ProfileInfo}></Route>
					<Route path="/updateprofile/" component={UpdateProfile}></Route>
					<Route path="/updatezone/:zoneid" component={UpdateZone}></Route>
				</Router>
			</Provider>
		)
	}
}


export default App
