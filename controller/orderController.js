var Controller = require("./controller");
const App = require("../models/app");
const Pro = require("../models/province");
const Room = require("../models/room");
const sd = require("silly-datetime");
var express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// var ejs= require('ejs');
// app.engine('html',ejs.__express);
// app.set('view engine','html');


class categoryController extends Controller {
    constructor() {
        super()
        // this指向问题，修改this的指向，this原本指向路由
        // this.index = this.index.bind(this);
    }

    prodels(req, res) {
        var id = req.query.id;
        Pro.deleteOne({ "_id": id }, function (err, result) {
            if (err) {
                throw ErrorEvent("数据删除失败");
            }
            res.redirect("/admin/province")
        })
    }
    province(req, res) {
        // 分页功能
        Pro.getCategoryDataAndCount(4, req.query.page, function (result, num) {
            req.session.result = result;
            req.session.pageCount = num;
            // res.json({"code":200,"message":"数据操作成功","result":result});
            res.render("admin/province", req.session);
        })

    }


    dels(req, res) {
        var id = req.query.id;
        App.deleteOne({ "_id": id }, function (err, result) {
            if (err) {
                throw ErrorEvent("数据删除失败");
            }
            res.redirect("/admin/app")
        })
    }
    app(req, res) {
        // 分页功能
        App.getBack(3, req.query.page, function (result, num) {
            req.session.result = result;
            req.session.pageCount = num;
            // res.json({"code":200,"message":"数据操作成功","result":result});
            res.render("admin/app", req.session);
        })

    }

    find(req, res) {
        console.log(req.body.findname);
        console.log("-------------------");
        App.find({ "name": req.body.findname }, function (err, result) {
            console.log(result);
            req.session.result = result;
            if (err) {
                throw ErrorEvent("数据查找失败");
            }
            res.render("admin/app", req.session);

        })

    }

    findpro(req, res) {
        console.log(req.body.findname);
        console.log("-------------------");
        Pro.find({ "name": req.body.findname }, function (err, result) {
            console.log(result);
            req.session.result = result;
            if (err) {
                throw ErrorEvent("数据查找失败");
            }
            res.render("admin/province", req.session);

        })

    }

    room(req, res) {
        Room.find({},function(err,result){
            console.log(result);
            req.session.Time = sd.format(new Date(), "YYYY-MM-DD HH:mm:ss");
            req.session.result = result;
            if(err){
                throw ErrorEvent("数据查找失败");
            }
            res.render("admin/room",req.session);
            
        })

        // res.render("admin/room",req.session);
    }
    roomPost(req, res) {
        console.log(req.body);
        req.body.addTime = sd.format(new Date(), "YYYY-MM-DD HH:mm:ss");
        // res.json({"code":200,"message":"json数据请求成功","result":req.body});
        // res.render("admin/room", req.session); //,"result":req.body
        Room.insertMany(req.body,function(err,result){
            req.session.result=result
            if(err){
                res.render("admin/error",{err:"数据添加失败",url:"/admin/room",date:3000});
                return;
            }
            // res.redirect("/admin/room")
            res.render("admin/room",req.session);
        })
        // res.render("admin/room",req.session);
    }
    rodels(req,res){
        var id = req.query.id;
        Room.deleteOne({ "_id": id }, function (err, result) {
            if (err) {
                throw ErrorEvent("数据删除失败");
            }
            res.redirect("/admin/room")
        })
    }
    // findroom(req,res){
    //     console.log(req.body);
    //     console.log("-------------------");
    //     Room.find({},function(err,result){
    //         console.log(result);
    //         req.session.Time = sd.format(new Date(), "YYYY-MM-DD HH:mm:ss");
    //         req.session.result = result;
    //         if(err){
    //             throw ErrorEvent("数据查找失败");
    //         }
    //         res.render("admin/room",req.session);
            
    //     })

    //     }


}



module.exports = new categoryController;