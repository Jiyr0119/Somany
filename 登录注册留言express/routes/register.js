var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

router.get('/', function(req, res, next) {
  	res.render('register', {link: "/register/addUser", value: "注册", title: "注册页面"});
});

router.post('/addUser', function(req, res, next) {
    var username = req.body.username,
  	    password = req.body.password;
  
	if(!username || !password){
	  	res.send("您填写的信息不全");
	  	return;
	}
	
	MongoClient.connect("mongodb://127.0.0.1:27017/newclass",function(err, db) {
		var collection = db.collection("user");
		collection.find({
			username: username
		}).toArray(function(err, result) {
			if(result.length){
				res.send("用户名已被注册");
				db.close();
			}else{
				collection.save({
					username: username,
					password: password
				}, function(err){
					if(err) {
						res.send("注册失败");
					}else{
						res.redirect('/');
					}
					db.close();
				})
			}
		})
	})
});

module.exports = router;