// 继承
const Controller = require("./controller");

const md5 = require("../function/md5");
const User = require("../models/User");
const Room = require("../models/room");
var uploads = require("../function/upload");

class AdminController extends Controller{
    constructor(){
        super(); //必须初始化父类参数
         // this对象指向问题，修改this指向类。原本this指向路由
        this.index = this.index.bind(this);
    }


    // 登录页面
    login(req,res){
        res.render("admin/login");
    }

    // 注册页面
    register(req,res){
        res.render("admin/register");
    }

    registerPost(req,res){
        console.log(req.body);
        console.log("********")
        var fields = md5(req.body);
        if(req.body == null){
            res.render("admin/error",{err:"请输入用户名密码",url:"/admin/register",date:3000});
        }
        User.insertMany(fields,function(err,result){
            res.render("admin/success",{err:"注册成功！",url:"/admin/login",date:3000});
        })
    }

    // uploadhead(req, res) {
    //     uploads.init(req,function(data){
    //         if(data.err == 200){
    //             res.json(data);
    //         }else{
    //             res.render("admin/error", { err: "数据添加失败", url: "/admin/goods", date: 3000 });
    //         }
    //     })
    // }


    // 登录验证
    loginPost(req,res){
    //    登录数据验证
        var fields = md5(req.body); //1.失败 false 2.成功 obj
        // console.log(fields);
        if(!fields){
            res.render("admin/error",{err:"请输入正确的用户名密码",url:"/admin/login",date:3000});
        }

        // 测试添加用户
        // Room.insertMany({ "Timee": "2019.06.03", "message": "sdfghsdhdfhsasfdgsdfdffh"},function(err,result){
        //     console.log("成功添加");
        // })
        // 数据库验证
        User.isUsernameAndPassword(fields,function(result){
            if(result){
                    // 添加session参数
                    req.session.login = 1; //登录成功
                    req.session.username = fields.username;
                    res.render("admin/index",req.session); 
            }else{
                res.render("admin/error", { err: "请输入正确的用户名密码", url: "/admin/login", date: 3000 });
            }
        })
    }
    // 验证是否登录，过滤后台连接
    validate(req,res,next){
            if(req.session.login == "1"){
                next()
            }else{
                res.render("admin/login");
            }
    }
    // 后台首页
    index(req, res) {
        console.log(req.session);
        // res.send("后台首页")
        res.render("admin/index", req.session);
    }
    // 退出登录
    out(req,res){
        req.session.login = 0;
        req.session.username = null;
        res.render("admin/login");
    }
    // 切换账号
    change(req,res){
        res.render("admin/change");
    }
    changePost(req,res){
        //    登录数据验证
        console.log("............")
        console.log(req.body)
        var fields = md5(req.body); //1.失败 false 2.成功 obj
        // console.log(fields);
        if(!fields){
            res.render("admin/error",{err:"请输入正确的用户名密码",url:"/admin/login",date:3000});
        }

        User.isUsernameAndPassword(fields,function(result){
            if(result){
                    // 添加session参数
                    req.session.login = 1; //登录成功
                    req.session.username = fields.username;
                    res.render("admin/index",req.session); 
            }else{
                res.render("admin/error", { err: "请输入正确的用户名密码", url: "/admin/login", date: 3000 });
            }
        })
    }
}

module.exports = new AdminController;