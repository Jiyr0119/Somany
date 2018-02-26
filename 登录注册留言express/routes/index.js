var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var pageSize = 8;
var pageNum = 1;

router.get('/', function(req, res, next) {
	
	var page = req.query.page ? req.query.page : 1;
	
	MongoClient.connect("mongodb://127.0.0.1:27017/newclass",function(err, db){
		var collection = db.collection("comment");
		collection.find({}).limit(pageSize).skip((page-1) * pageSize).toArray(function(err, result) {
			collection.find({}).count(function(err, totalNum) {
				pageNum = Math.ceil(totalNum / pageSize);
				
				res.render('index', {
					result: result,
					pageNum: pageNum,
			  		login: req.session.login,
			  		username: req.session.username,
			  		avatar: req.session.avatar
			  })
				
				db.close();
				
			})
		});
	});
});



module.exports = router;
