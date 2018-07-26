var express = require('express');
var router = express.Router();

var Posts = require('../db.json');
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home', posts: Posts.posts });
});

// GET NEW page
router.get('/new', function (req, res, next) {
  res.render('new');
});
module.exports = router;

// GET archives page
router.get('/archives', function (req, res, next) {
  res.render('archives');
});

// POST new page
router.post('/new', function (req, res, next) {
  // res.send (req.body)
  let obj = {
    "title": req.body.title,
    "author": req.body.author,
    "datetime": req.body.datetime,
    "content": req.body.content,
    "image": req.body.image
  }

  // write logic that saves this data
  request.post({
    url: 'http://localhost:8000/posts',
    body: obj,
    json: true
  }, function (error, responsive, body) {
    // what to send when function has finished
    res.redirect('/');
  });

});



// GET article page
router.get('/article1', function (req, res, next) {
  res.render('article1');
});

router.get('/article2', function (req, res, next) {
  res.render('article2');
});

router.get('/article3', function (req, res, next) {
  res.render('article3');
});

// GET archives page
router.get('/archive', function (req, res, next) {
  res.render('archives', { title: 'archive', posts: Posts.posts });
});

// delete button
router.get('/delete/:id', function(req,res,next){
  request ({
    url: "http://localhost:8000/posts/" + req.params.id,
    method: "Delete",
  }, function(error, response, body){

    res.redirect('/archive');
  });
});

/* GET Create post. */
router.get('/edit', function(req, res, next) {
  res.render('edit');
});