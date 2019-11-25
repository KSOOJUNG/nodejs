// https://api.apiopen.top/musicBroadcasting
// https://api.apiopen.top/musicRankings

// https://wanandroid.com/wxarticle/chapters/json
const mongoose = require("mongoose");

//请求数据 http模块
const https = require("https");
// 数据库连接与服务器开启
mongoose.connect("mongodb://127.0.0.1:27017/admin", { useNewUrlParser: true }, function (err) {
    if (err) {
        throw Error(err)
        console.log(err);
    }
})

// 数据库骨架
var radiosSchema = mongoose.Schema({
    "author":String,
    "link": String,
    "type": String,
    "title": String, 
    "songid": String
})

var zhoujielun = mongoose.model("zhoujielun", radiosSchema);

// 请求api接口，把数据导入本地数据库
var url = `https://api.apiopen.top/searchMusic?name=%E5%91%A8%E6%9D%B0%E4%BC%A6`;

https.get(url, (res) => {
    // 数据请求一段一段接收
    var data = "";
    res.on("data", (chunk) => {
        data += chunk;
    })
    res.on("end", () => {
        // 字符串转json
        let jsondata = JSON.parse(data);
        // 把数据表里数据库
        let zjljson = jsondata.result;
        // console.log(radiojson);
        for (var key in zjljson) {
            zhoujielun.insertMany({
                "author": zjljson[key].author,
                "link": zjljson[key].link,
                "pic": zjljson[key].pic,
                "type": zjljson[key].type,
                "title": zjljson[key].title,
                "songid": zjljson[key].songid
            }, function (err, doc) {
                console.log(doc[0].title + "----" + doc[0].id);
            })
        }
    }).on("error", () => {
        console.log("数据请求失败");
    })
})


// https://api.apiopen.top/musicBroadcasting
// https://api.apiopen.top/musicRankings

// https://wanandroid.com/wxarticle/chapters/json
// http://www.wangshuwen.com/api/getRegion

// $().ready(function () {
    // $(function () {
    //     console.log("**************")
    //     $.ajax({
    //         url: "",
    //         dataType: "json",
    //         success: function (data) {
    //             console.log("sdfgsgdgdfgsdfg")
    //             console.log(data);
    //             if (data.code == "200") {
    //                 $("#discussion").empty().append(temp(data.result));
    //             } else {
    //                 alert("数据请求失败");
    //             }
    //         }
    //     })
    //     //模板
    //     function temp(result) {
    //         var str = "";
    //         var con = "left";
    //         for (k in result) {
    //             str += '<div class="chat-message ' + con + '">';
    //             str += '<div class="message">';
    //             str += '<a class="message-author" href="#"> ' + result.username + '</a>';
    //             str += '<span class="message-date"> ' + result.addTime + ' </span>';
    //             str += '<span class="message-content">';
    //             str += result.message;
    //             str += '</span></div></div> ';
    //             // $("#discussion").append(str);      
    //         }
    //         $("#discussion").append(str);
    //         return str;
    //     }
    // })
