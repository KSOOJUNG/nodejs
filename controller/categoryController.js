var Controller = require("./controller");
const Category = require("../models/category");
const Back = require("../models/back");
const Api = require("../models/api");

class categoryController extends Controller{
    constructor(){
        super()
        // this指向问题，修改this的指向，this原本指向路由
        // this.index = this.index.bind(this);
    }
    // 分类首页
    index(req,res){
         // 分页功能
        Category.getCategoryDataAndCount(3,req.query.page,function(result,num){
                    req.session.result = result;
                    req.session.pageCount = num;
                    // res.json({"code":200,"message":"数据操作成功","result":result});
                    res.render("admin/category",req.session);
        })
       
    }
    
    add(req,res){
        res.render("admin/categoryAdd",req.session);
    }
    addPost(req,res){
        Category.insertMany(req.body,function(err,result){
            if(err){
                res.render("admin/error",{err:"数据添加失败",url:"/admin/category",date:3000});
                return;
            }
            res.redirect("/admin/category")
        })
    }
    edit(req,res){
        res.send("后台分类修改功能")
    }

    del(req,res){
        var id = req.query.id;
        Category.deleteOne({"_id":id},function(err,result){
            if(err){
                throw ErrorEvent("数据删除失败");
            }
            res.redirect("/admin/category")
        })
    }
    dels(req,res){
        var id = req.query.id;
        Back.deleteOne({"_id":id},function(err,result){
            if(err){
                throw ErrorEvent("数据删除失败");
            }
            res.redirect("/admin/background")
        })
    }

    background(req,res){
        // 分页功能
        Back.getBack(3,req.query.page,function(result,num){
            req.session.result = result;
            req.session.pageCount = num;
            // res.json({"code":200,"message":"数据操作成功","result":result});
            res.render("admin/background",req.session);
})
        // Back.find({},function(err,result){
        //     req.session.result = result;
        //     res.render("admin/background",req.session);
        // })
    }


    apidel(req,res){
        var id = req.query.id;
        Api.deleteOne({"_id":id},function(err,result){
            if(err){
                throw ErrorEvent("数据删除失败");
            }
            res.redirect("/admin/api")
        })
    }
    api(req,res){
        // 分页功能
        Api.getBack(3,req.query.page,function(result,num){
            req.session.result = result;
            req.session.pageCount = num;
            // res.json({"code":200,"message":"数据操作成功","result":result});
            res.render("admin/api",req.session);
})
        // Back.find({},function(err,result){
        //     req.session.result = result;
        //     res.render("admin/background",req.session);
        // })
    }
    
    find(req,res){
        console.log(req.body.findname);
        console.log("-------------------");
        Category.find({"name":req.body.findname},function(err,result){
            console.log(result);
            req.session.result = result;
            if(err){
                throw ErrorEvent("数据删除失败");
            }
            res.render("admin/category",req.session);
            
        })

        }
    

}



module.exports = new categoryController;