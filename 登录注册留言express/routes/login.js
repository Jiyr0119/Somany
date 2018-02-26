var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
var fs = require("fs");

router.get('/',function(req, res, next) {
	res.render("register", {link: "/login/checkUser", value: "登录", title: "登录页面"});
});

router.get('/logout',function(req, res, next) {
	req.session = null;
	res.redirect("/");
});

router.get('/addAvatar', function(req, res, next) {
	res.render("add_avatar");
})

router.post('/uploadImg', multipartMiddleware, function(req, res, next) {
	var dateStamp = Date.parse(new Date());
	fs.rename(req.files.avatar.path, "./public/images/" + dateStamp + req.files.avatar.name , function(err){
//		console.log(err);    有bug 图片临时存储在c盘，没有办法放在d盘
		MongoClient.connect("mongodb://127.0.0.1:27017/newclass", function(err, db) {
			var collection = db.collection("user");
			collection.update({
				username: req.session.username
			},{
				$set:{
					avatar:"/images/" + dateStamp + req.files.avatar.name
				}
			},function(err){
				req.session.avatar = "/images/" + dateStamp + req.files.avatar.name;
				res.send("上传图片成功");
				db.close();
			})
		})
	})
})

router.post('/checkUser',function(req, res, next){
	var username = req.body.username,
		password = req.body.password;
		
	if(!username || !password){
		res.send("请完整填写账号和密码");
		return;
	}
	
	MongoClient.connect("mongodb://127.0.0.1:27017/newclass", function( err, db ) {
		var collection = db.collection("user");
		collection.find({
			username: username,
			password: password
		}).toArray(function(err, result){
			if(result.length) {
				req.session.login = true;
				req.session.username = result[0].username;
				req.session.avatar = result[0].avatar;
				res.send("登录成功");
			}else {
				res.send("登录失败");
			}
			db.close();
		})
	})
	
})

module.exports = router;
