var express = require('express');
var path = require('path');      //核心模块 相对绝对路径转换
var favicon = require('serve-favicon');//
var logger = require('morgan');					//日志
var cookieParser = require('cookie-parser');	//把cookie里的字符串解析成对象
var bodyParser = require('body-parser');	//把一段一段的html解析好
var cookieSession = require('cookie-session');

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');  //请求注册的路由
var login = require('./routes/login');				//请求登录的路由
var comment = require('./routes/comment');				//请求登录的路由

var app = express();	//创建了express实例

// view engine setup
app.set('views', path.join(__dirname, 'views'));	//默认去views查找
app.set('view engine', 'ejs');	//模板引擎用的是ejs

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//用use 的都是一个中间件，中间件是夹在请求和处理中间的东西
app.use(logger('dev'));		
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session_demo',
  secret: "!@#sd213dsfsdaffdsf",
  maxAge: 24 * 60 * 60 * 1000 
}))

app.use('/', index);
app.use('/users', users);
app.use('/register', register);
app.use('/login', login);
app.use('/comment', comment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
