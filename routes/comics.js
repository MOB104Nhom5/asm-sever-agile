var express = require('express');
var router = express.Router();
var multer = require('multer');
var comicsController = require('../controllers/comics.controller');
var AuthMiddleware = require('../middleware/auth.midllware')

var uploadLogo = multer( { dest: './tmp/'});

router.get('/',AuthMiddleware.YeuCauDangNhap,comicsController.getComicsList)
router.post('/add',uploadLogo.single('Logo'),comicsController.postAddComic)
// router.post('/update',uploadLogo.single('UpdateLogo'),comicsController.postUpdateComics)
router.post('/update',comicsController.postUpdateComics)
router.post('/delete',comicsController.postDeleteComics)
router.post('/search',comicsController.postSearchComic)



router.get('/view/:id',comicsController.getViewComic);
router.post('/view/:id',comicsController.postViewComic);
// var uploader = multer( { dest: './tmp/'});
// router.post('/add-content',uploader.array('AddContentImage'),comicsController.postAddContent)

module.exports = router;
