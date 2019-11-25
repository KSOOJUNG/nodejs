const mongoose = require("mongoose");

// 请求数据 http模块
const http = require("https");
// 数据库连接与服务器开启
mongoose.connect("mongodb://127.0.0.1:27017/admin", { useNewUrlParser: true }, function (err) {
    if (err) {
        throw Error(err);
        console.log("请检查数据库连接");
    }
})

// 数据库骨架
var AppSchema = mongoose.Schema({
    "courseId": Number,
    "name": String,
    "order":String,
    "parentChapterId":String,
    "userControlSetTop":String
})

var App = mongoose.model("app", AppSchema);

// 请求api接口，把数据导入本地数据库
var url = `https://wanandroid.com/wxarticle/chapters/json`;

http.get(url, (res) => {
    // 数据请求一段一段接收
    var data = "";
    res.on("data", (chunk) => {
        data += chunk;
    })
    res.on("end", () => {
        // 字符串转json
        let jsondata = JSON.parse(data);
        // 把数据表里数据库
        let appjson = jsondata.data;
        // console.log(musicjson);
        for (var key in appjson) {
            App.insertMany({
                "courseId": appjson[key].courseId,
                "name": appjson[key].name,
                "order": appjson[key].order,
                "parentChapterId": appjson[key].parentChapterId,
                "userControlSetTop": appjson[key].userControlSetTop,
            }, function (err, doc) {
                console.log(doc[0].name + "----" + doc[0].id);
            })
        }
    })
}).on("error", () => {
    console.log("数据请求失败");
})
