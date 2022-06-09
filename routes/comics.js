var express = require('express');
var router = express.Router();
var multer = require('multer');
var comicsController = require('../controllers/comics.controller');
var viewChapterController = require('../controllers/viewChapter.controller');
var AuthMiddleware = require('../middleware/auth.midllware')

var uploadLogo = multer( { dest: './tmp/'});

router.get('/',AuthMiddleware.YeuCauDangNhap,comicsController.getComicsList)
router.post('/add',uploadLogo.single('Logo'),comicsController.postAddComic)
// router.post('/update',uploadLogo.single('UpdateLogo'),comicsController.postUpdateComics)
router.post('/update',comicsController.postUpdateComics)
router.post('/delete',comicsController.postDeleteComics)
router.post('/search',comicsController.postSearchComic)



router.get('/view/:id',viewChapterController.getViewChapter);
router.post('/view/:id/add',viewChapterController.postAddChapter);
router.post('/view/:id/delete',viewChapterController.postDeleteChapter);
router.post('/view/:id/update',viewChapterController.postUpdateChapter);
router.post('/view/:id/search',viewChapterController.postSearchChapter);

module.exports = router;
