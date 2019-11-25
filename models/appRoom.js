// 配置模块
const express = require('express');
const session = require('express-session');
const app = express();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// let upload = require("./function/upload");
const sd = require("silly-datetime");
var escapist = require("node-escapist");

// 模板引擎配置
var ejs = require('ejs');
app.engine('html',ejs.__express);
app.set('view engine','html');

// 配置session
app.use(session({
    secret:"iloveyou",//验证 data+key
    resave:false,
    saveUninitialized:true
}))

app.use(express.static("./public"));
app.use('/uploads',express.static("./uploads"));

var alluser = [

]

app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/room',(req,res)=>{
    if(!req.session.username){
        res.redirect("/");
        return;
    }
    res.render("room",req.session);
})

app.post('/upload',(req,res)=>{
    upload.init(req,function(data){
        res.json(data);
    })
})

app.get('/check',(req,res)=>{
    var obj = req.query;
    if(!obj.username){
        res.send("请输入用户名！")
        return;
    }
    // 判断用户名是否已存在
    if(JSON.stringify(alluser).indexOf(obj.username)!=-1){
        res.send("用户名已存在");
        return;
    }
    alluser.push(obj);
    
    // 把数据添加到session
    req.session.username = obj.username;
    req.session.img = obj.img;
    console.log(alluser);
    res.redirect("/room");
})
// socket 访问方式s
io.on('connection',(socket)=>{
    console.log("用户个数");
    // 用户数据列表
    io.emit("userList",alluser);
    console.log(alluser);
    
    socket.on("liaotian",function(data){
        // 添加时间
        data.addTime = sd.format(new Date(),"YYYY-MM-DD HH:mm:ss");
        data.content = escapist.escape(data.content);
        data.alluser = alluser;

        // 把数据广播出去
        io.emit("liaotian",data);
        console.log(data);
    })
})

server.listen(3000,'192.168.31.108',()=>console.log('请访问：http://127.0.0.1:3000'));