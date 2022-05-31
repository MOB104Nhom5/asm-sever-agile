var express = require('express');
var router = express.Router();

var multer = require('multer');
var userController = require('../controllers/user.controller');
var AuthMiddleware = require('../middleware/auth.midllware')

var uploadLogo = multer( { dest: './tmp/'});
/* GET users listing. */
router.get('/',AuthMiddleware.YeuCauDangNhap,userController.getUserList)
router.post('/add',uploadLogo.single('Avatar'),userController.postAddUser)
router.post('/edit',uploadLogo.single('Avatar'),userController.postUpdateUser)
router.post('/repass',userController.postUpdatePass)
router.post('/delete',userController.postDeleteUser)
router.post('/search',userController.postSearch)

module.exports = router;
