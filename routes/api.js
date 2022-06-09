const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ApiController = require('../controllers/Api.controller');
const auth = require('../middleware/api.auth.midlware')
router.get('/', (req, res) => {
    res.send('API works');
});
router.get('/user',function (req,res,next) {
    mongoose.connect('mongodb+srv://thopham02hp:thogia100502@cluster0.5g5ri.mongodb.net/Agile')
    const db = mongoose.connection;
    db.collection('User').find().toArray(
        function (err, User){
            if (err){
                res.sendStatus(500)
                console.log(err)
            }else { res.send(User) }
        }
    )
});

//comic
router.get('/Comics', ApiController.getComicsList);
router.get('/Comics/:id', ApiController.getComic);// lấy được cả truyện lẫn chap truyện
router.get('/ListComicUp/:id', ApiController.getComicsListUserUp); // lấy list  những truyện mà người dùng đã up lên
router.get('/ComicUp/:id', ApiController.getComicUserUp); // lấy truyện và list chapter của truyện mà người dùng up lên
router.get('/ComicUp/chapter/:id', ApiController.getChapterUserUp); // lấy chapter mà người dùng up lên


router.post('/Comic/up', ApiController.postUpComic);// up truyện
router.post('/Comic/up/chapter', ApiController.postUpComicChapter);// up chapter truyện
router.post('/ComicUp/chapter/:id/delete', ApiController.getChapterUserUp); // xóa chapter mà người dùng up lên
router.get('/ComicUp/chapter/:id/update', ApiController.getChapterUserUp); // sửa chapter mà người dùng up lên
//tìm kiếm
router.post('/Comic/search', ApiController.postSearchComic);// tìm kiếm truyện theo tên
router.post('/Comic/searchCategory', ApiController.postSearchComicByCategory);// tìm kiếm truyện theo thể loại



//user
router.get('/user/profile',auth,ApiController.getProfile );
router.post('/login', ApiController.postLogin);
router.post('/reg',ApiController.postReg);
router.post('/user/edit',ApiController.postEditProfile);
router.post('/user/editPass',ApiController.postEditPassword);
router.post('/user/logout',auth,ApiController.postLogout ) ;
router.post('/user/logout-all',auth,ApiController.postLogoutAll ) ;
module.exports = router;




