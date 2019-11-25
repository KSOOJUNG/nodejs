var controller = require("./controller");

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
}


module.exports = new goodsApiController;