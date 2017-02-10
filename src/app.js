import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { UpdateProfile, UpdateZone } from './components/containers'
import {Home, ProfileInfo } from './components/layout/'
import { Provider } from 'react-redux'
import store from './stores/store'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'


const app = (
	<Provider store={ store.configureStore()}>
		<Router history={browserHistory}>
			<Route path="/" component={Home}></Route>
			<Route path="/profile/:username" component={ProfileInfo}></Route>
			<Route path="/updateprofile/" component={UpdateProfile}></Route>
			<Route path="/updatezone/:zoneid" component={UpdateZone}></Route>
		</Router>
	</Provider>
)



ReactDOM.render(app, document.getElementById('root'))
