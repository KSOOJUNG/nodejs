var express = require('express');
var router = express.Router();
// 函数 只要调用立即执行函数内部代码段
// 函数体 只是调用函数体，只会返回函数

var adminController = require("../controller/adminController");
var categoryController = require("../controller/categoryController");
var goodsController = require("../controller/goodsController");
var orderController = require("../controller/orderController");

router.get("/login",adminController.login);
router.post("/login",adminController.loginPost);
router.post("/register",adminController.registerPost);
router.get("/register",adminController.register);
// router.post('/register/upload',adminController.uploadhead);
router.use(adminController.validate) //能通过后台验证是否登录
router.get("/",adminController.index);
router.get('/out',adminController.out);
router.get('/change',adminController.change);
router.post('/changePost',adminController.changePost);
// 分类功能

// router.get('/',adminController.index);
router.get('/category',categoryController.index);
router.get('/category/add',categoryController.add);
router.post('/category/add',categoryController.addPost);
router.get('/category/edit',categoryController.edit);
router.get('/category/del',categoryController.del);
router.post('/category/find',categoryController.find);

router.get('/background/dels',categoryController.dels);
router.get('/background',categoryController.background);

router.get('/app/dels',orderController.dels);
router.get('/app',orderController.app);
router.post('/app/find',orderController.find);

router.get('/province/prodels',orderController.prodels);
router.get('/province',orderController.province);
router.post('/province/find',orderController.findpro);

router.get('/api/dels',categoryController.apidel);
router.get('/api',categoryController.api);

router.get('/room',orderController.room);
router.post('/roomtext',orderController.roomPost);
router.get('/room/rodels',orderController.rodels);
// router.post('/room/find',orderController.findroom);


// 商品功能
router.get('/goods',goodsController.index);
router.get('/goods/add',goodsController.add);
router.post('/goods/add',goodsController.addPost);
router.post('/goods/upload',goodsController.upload);
router.get('/goods/del',goodsController.del);
router.get('/goods/edit',goodsController.edit);
router.post('/goods/editPost',goodsController.editPost);
router.post('/goods/deleteImg',goodsController.deleteImg);


module.exports = router;