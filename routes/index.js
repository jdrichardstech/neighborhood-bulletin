var express = require('express');
var router = express.Router();

var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')
var Home = require('../public/build/es5/components/layout/Home')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createzone', function(req, res, next) {
  res.render('createzone', null);
});

router.get('/createcomment', function(req, res, next) {
  res.render('createcomment', null);
});

module.exports = router;
