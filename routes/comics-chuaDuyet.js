var express = require('express');
var router = express.Router();
var multer = require('multer');
var comicsController = require('../controllers/comics.controller');
var AuthMiddleware = require('../middleware/auth.midllware')
const viewChapterController = require("../controllers/viewChapter.controller");

var uploadLogo = multer( { dest: './tmp/'});

router.get('/',AuthMiddleware.YeuCauDangNhap,comicsController.getComicsListChuaDuyet)
router.post('/add',uploadLogo.single('Logo'),comicsController.postAddComic)
router.post('/edit',uploadLogo.single('UpdateLogo'),comicsController.postUpdateComics)
router.post('/delete',comicsController.postDeleteComics)
router.post('/duyet',comicsController.postDuyetComics)
router.post('/search',comicsController.postSearchComicChuaDuyet)

router.get('/view/:id',viewChapterController.getViewChapter);
router.post('/view/:id/add',viewChapterController.postAddChapter);
router.post('/view/:id/delete',viewChapterController.postDeleteChapter);
router.post('/view/:id/update',viewChapterController.postUpdateChapter);
router.post('/view/:id/search',viewChapterController.postSearchChapter);

module.exports = router;
