var express = require('express');
var router = express.Router();

var goodsApiController = require("../controller/goodsApiController");
var vueApiController = require("../controller/vueApiController");

router.get('/',goodsApiController.index);
router.get('/list',goodsApiController.list);

router.get('/vuelist',vueApiController.vuelist);
router.get('/goodslist',vueApiController.goodslist);


module.exports = router;