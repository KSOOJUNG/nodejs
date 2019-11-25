var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    res.send("前台首页1")
})

router.get("/list" ,(req, res) => {
    res.send("前台列表1")
})

router.get("/xq", (req, res) => {
    res.send("前台详情页1")
})

module.exports = router;
