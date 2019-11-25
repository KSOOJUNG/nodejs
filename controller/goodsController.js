var Controller = require("./controller");
var Goods = require("../models/Goods");
var formidable = require("formidable")
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");
var uploads = require("../function/upload");

class goodsController extends Controller {
    constructor() {
        super();
    }
    index(req, res) {
        // res.render("admin/goods",req.session);
        //     Goods.find(function(err,result){
        //         req.session.result = result;
        //         res.render("admin/goods",req.session);
        // })
        Goods.getGoodsData(3, req.query.page, function (result, num) {
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/goods", req.session);
        })
    }

    add(req, res) {
        res.render("admin/goodsAdd", req.session);
    }
    // 提交数据
    addPost(req, res) {
        console.log(req.body);
        Goods.insertMany(req.body, function (err, result) {
            if (err) {
                console.log(err);
                res.render("admin/error", { err: "数据添加失败", url: "/admin/goods", date: 3000 });
                return;
            }
            res.redirect("/admin/goods");
        })
    }
    del(req, res) {
        Goods.delDataAndPhoto(req.query.id,function(err){
            if (err) {
                        throw ErrorEvent("数据删除失败");
                    }
                    res.redirect("/admin/goods");
                    return;
        })
        // var id = req.query.id;
        // Goods.findOne({ "_id": id }, function (err, result) {
        //     console.log(result);
        //     var aa = result.thumbnail;
        //     var img = result.imgs;

        //     fs.unlink("./" + aa, function (err) {
        //         if (err) throw Error("删除图片失败");
        //     })
        //     for (var i = 0; i < img.length; i++) {
        //         fs.unlink("./" + img[i], function (err) {
        //             if (err) throw Error("删除imgs图片失败");
        //         })
        //     }
        // })
        // Goods.deleteOne({ "_id": id }, function (err, result) {
        //     if (err) {
        //         throw ErrorEvent("数据删除失败");
        //     }
        //     else {
        //         res.redirect("/admin/goods")
        //     }
        // })
    }
    // 添加图片
    upload(req, res) {
        uploads.init(req,function(data){
            if(data.err == 200){
                res.json(data);
            }else{
                res.render("admin/error", { err: "数据添加失败", url: "/admin/goods", date: 3000 });
            }
        })
        // var form = new formidable.IncomingForm();
        // form.uploadDir = "./tupianhuancun";
        // form.parse(req, function (err, fields, files) {
        //     if (err) {
        //         throw Error(err);
        //     }
        //     // 判断图片大小
        //     var size = parseInt(files.file.size / 1024 / 1024); //字节 - KB -M
        //     // 图片过大，删除本地数据
        //     if (size > 5) {
        //         fs.unlink("./" + files.file.path, function (er) {
        //             res.render("admin/error", { err: "图片不能超过5M", url: "/admin/goods/add", date: 3000 });
        //             return;
        //         })
        //     }
        //     // 修改图片名称 时间戳+随机数+后缀名
        //     var tt = sd.format(new Date(), "YYYYMMDDHHmmss");
        //     var rr = parseInt(Math.random() * 89999 + 10000);
        //     var ext = path.extname(files.file.name);

        //     // 旧路径
        //     var oldPath = "./" + files.file.path;
        //     // 新路径
        //     var newPath = path.normalize(__dirname + "/../uploads/" + tt + rr + ext);
        //     // 修改
        //     fs.rename(oldPath, newPath, function (err) {
        //         if (err) {
        //             throw err;
        //         }
        //         var imgurl = "/uploads/" + tt + rr + ext;
        //         res.json({ url: imgurl });
        //     })
        // })
    }
    // 删除图片
    deleteImg(req, res) {
        fs.unlink("./" + req.body.url, function (err) {
            res.send("1")
            return;
        })
    }

    // 数据
    edit(req,res){
        var id = req.query.id;
        
        Goods.findOne({_id:id},function(err,result){
            console.log(result);
            req.session.result = result;
            if(err) throw Error("修改查询失败"+err);
            else{
                // res.json({"code":200,"message":"数据查询成功","result":result})
                res.render("admin/goodsEdit",req.session);
            }
        })
    }

    //修改数据
    editPost(req,res){
        
        Goods.updateOne({_id:req.body.id},req.body,function(err,result){
            console.log(req.body.id);
            if(err){
                res.render("admin/error", { err: "数据操作失败", url: "/admin/goods", date: 3000 })
            }
            res.redirect("/admin/goods");
        })
    }

}


module.exports = new goodsController;