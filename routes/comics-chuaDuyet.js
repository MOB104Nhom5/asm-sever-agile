var express = require('express');
var router = express.Router();
var multer = require('multer');
var comicsController = require('../controllers/comics.controller');
var AuthMiddleware = require('../middleware/auth.midllware')

var uploadLogo = multer( { dest: './tmp/'});

router.get('/',AuthMiddleware.YeuCauDangNhap,comicsController.getComicsListChuaDuyet)
router.post('/add',uploadLogo.single('Logo'),comicsController.postAddComic)
router.post('/edit',uploadLogo.single('UpdateLogo'),comicsController.postUpdateComics)
router.post('/delete',comicsController.postDeleteComics)
router.post('/duyet',comicsController.postDuyetComics)
router.post('/search',comicsController.postSearchComicChuaDuyet)

router.get('/view/:id',comicsController.getViewComicChuaDuyet);
router.post('/view/:id',comicsController.postViewComicChuaDuyet);


module.exports = router;
