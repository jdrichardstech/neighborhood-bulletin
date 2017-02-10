var express = require('express')
var router = express.Router()
var Promise = require('bluebird')

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

router.get('/', function(req, res, next) {
	var initialStore = null
	var reducers = {}

	

	initialStore = store.configureStore(reducers)
  var routes = {
		path: '/',
		component: serverapp,
		initial: initialStore,
		indexRoute: {
			component: Home
		}
	}

	matchRoutes(req, routes)
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
		res.render('index', {react:html, preloadedState: JSON.stringify(initialStore.getState()) })
	})
	.catch(function(err){
		console.log('Test 2 Error')
	})
})

router.get('/createzone', function(req, res, next) {
  res.render('createzone', null);
});

router.get('/createcomment', function(req, res, next) {
  res.render('createcomment', null);
});

module.exports = router;
