var express = require('express')
var router = express.Router()
var Promise = require('bluebird')
var AccountController = require('../controllers/AccountController')
var controllers = require('../controllers')

var serverapp = require('../public/build/es5/serverapp')
var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')
var Home = require('../public/build/es5/components/layout/Home')
var store = require('../public/build/es5/stores/store')


matchRoutes = function(req, routes, initialStore){
	return new Promise(function(resolve, reject){
		ReactRouter.match({routes, location:req.url}, function(error, redirectLocation, renderProps){
			if(error){
				reject(error)
				return
			}
			resolve(renderProps)
		})
	})
}

// router.get('/', function(req, res, next) {
// 	var initialStore = null
// 	var reducers = {}
//
//
//
// 	initialStore = store.configureStore(reducers)
//   var routes = {
// 		path: '/',
// 		component: serverapp,
// 		initial: initialStore,
// 		indexRoute: {
// 			component: Home
// 		}
// 	}
//
// 	matchRoutes(req, routes)
// 	.then(function(renderProps){
// 		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
// 		res.render('index', {react:html, preloadedState: JSON.stringify(initialStore.getState()) })
// 	})
// 	.catch(function(err){
// 		console.log('Server Side Rendering Error: ' + err.message)
// 	})
// })

router.get('/', function(req, res, next) {
	var initialStore = null
	var reducers = {}

	AccountController.currentUser(req)

	.then(function(result){
//		console.log('CURRENT USER: '+JSON.stringify(result))
		reducers['account'] = { // Populate store/reducer with current user:
			user: result,
			appStatus: 'ready'
		}

		// fetch zones
		return controllers.zone.get(null)
	})
	.then(function(zones){
		reducers['zone'] = {
			selectedZone: 0,
			list: zones,
			appStatus: 'ready'
		}
	})
	.then(function(){
		// console.log('REDUCERS: '+JSON.stringify(reducers))
		initialStore = store.configureStore(reducers)
		var routes = {
			path: '/',
			component: serverapp,
			initial: initialStore,
			indexRoute: {
				component: Home
			}
		}

		return matchRoutes(req, routes)
	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
		res.render('index', {react:html, preloadedState: JSON.stringify(initialStore.getState()) })
	})
	.catch(function(err){
		console.log('Server Side Rendering Error: ' + err.message)
	})
})

router.get('/login',function(req, res, next){
	res.render('login', null)
})

router.get('/createzone', function(req, res, next) {
  res.render('createzone', null);
});

router.get('/createcomment', function(req, res, next) {
  res.render('createcomment', null);
});

module.exports = router;
