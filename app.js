//项目入口文件 制作配置

// 加载模块
var mongoose = require("mongoose");
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require("express-session");

var app = express();

// 配置允许跨域
// 自定义跨域中间件
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
});

// 模板引擎配置
app.engine('html',ejs.__express);
app.set('view engine','html');

// 静态文件加载
app.use(express.static("./public"));
app.use("/uploads",express.static("./uploads"));
//post数据请求处理 body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// session 配置s
app.use(session({
    secret:"iloveyou", // 验证 data+key
    resave:false,
    saveUninitialized:true
}))

// 第一模块 前台首页
app.use('/',require("./routers/Main"));

// 第二模块 后台首页
app.use('/admin',require("./routers/Admin"));

// 第三模块 API板块
app.use('/api',require("./routers/Api"));

mongoose.connect("mongodb://127.0.0.1/admin",{useNewUrlParser:true},function(err){
    if(err){
        throw Error(err);
        console.log("请检查数据库连接！");
    }else{
        // 网络监听
        app.listen(3000,'127.0.0.1',()=>console.log("请访问：127.0.0.1:3000"));
    }
})
// "repository": {
//     "type": "git",
//     "url": "git+https://github.com/KSOOJUNG/nodejs.git"
//   },
//   "bugs": {
//     "url": "https://github.com/KSOOJUNG/nodejs/issues"
//   },
//   "homepage": "https://github.com/KSOOJUNG/nodejs#readme"

