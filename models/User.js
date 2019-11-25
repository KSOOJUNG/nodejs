var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:true  //默认不是管理员，true才是管理员
    },
    headimg:String
})

userSchema.statics.isUsernameAndPassword = function (fields, callback){
    this.findOne({ 'username': fields.username }, function (err, result) {
        // 判断密码
        if (result != null && fields.password == result.password && result.isAdmin == true) {
            callback(true);
        } else {
            callback(false);
        }
    })
}

module.exports = mongoose.model("Usera",userSchema);