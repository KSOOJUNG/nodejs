var mongoose = require("mongoose");

var ProSchema = mongoose.Schema({
    courseId:String,
    name:String
})
// CategorySchema.method // 动态方法  把定义方法直接加入骨架Schema
// CategorySchema.statics  //静态方法   在骨架外定义方法，不属于骨架全局方法

ProSchema.statics.getCategoryDataAndCount = function(limit,pageData,callback){
    var page = 0;
    if (pageData != undefined) {
        page = pageData;
    }
    var _this = this;
    _this.find({}).limit(limit).skip(page * limit).then(function (result) {
        _this.find().count().then(function (num) {
            callback(result,Math.ceil(num / limit));
        })
    })
}

// GameSchema.statics.findname = function(name,callback){
//     var _this = this;
//     _this.find({"name":req.query.name},function(callback){
        
//     })
// }


module.exports = mongoose.model("addresse",ProSchema);