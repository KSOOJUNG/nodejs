var controller = require("./controller");
var Game = require("../models/category");
var Goods = require("../models/Goods");

class goodsApiController extends controller{
    constructor(){
        super();
    }
    index(req,res){
        res.send("API板块商品");
    }
    list(req,res){
        res.send("API商品列表");
    }
    vuelist(req,res){
        Game.find(function(err,result){
            res.json({"code":200,"message":"数据操作成功","result":result});
            // res.json({"result":result});
        })
    }
    goodslist(req,res){
        Goods.find(function(err,result){
            res.json({"code":200,"message":"数据操作成功","result":result});
            // res.json({"result":result});
        })
    }
}


module.exports = new goodsApiController;