const comicsModel = require("../models/comics.models");
var fs = require('fs');
const {readdirSync, rename} = require('fs');
const {resolve} = require('path');
var mkdirp = require('mkdirp');
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.models");

exports.getComicsList = async (req, res, next) => {
    const comicsList = await comicsModel.find({TrangThai : true});
    res.render('./comics/comics', {comics: comicsList});
    console.log(req.body);
}
exports.getComicsListChuaDuyet = async (req, res, next) => {
    const comicsList = await comicsModel.find({TrangThai : false});
    res.render('./comics/comics-chuaDuyet', {comics: comicsList});
    console.log(req.body);
}



exports.postAddComic = async (req, res, next) => {
    const comicsList = await comicsModel.find({});
    const imageDirPath = resolve(__dirname, '../tmp');
    const files = fs.readdirSync(imageDirPath);

    var newNameDir = req.body.Name.toLowerCase().replace(" ", "_")
    var dir = './public/uploads/' + newNameDir;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);

    } else {
        console.log("Directory already exist");
    }

    fs.rename(
        req.file.destination + req.file.filename,
        './public/uploads/' + newNameDir + '/' + "logo_" + newNameDir + ".png",
        err => console.log(err)
    );
    var nameLogo = "/uploads/" + newNameDir + '/' + "logo_" + newNameDir + ".png";

    const objComic = new comicsModel({
        Name: req.body.Name,
        Logo: nameLogo,
        Author: req.body.Author,
        Description: req.body.Description,
        TrangThai: req.body.TTAdd,
    });

    await objComic.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Thêm thành công");

        }
    });

    res.redirect('/comics');

}

exports.postUpdateComics = async (req, res, next) => {
    console.log(req.body.UpdateComicID1);
    console.log(req.body.value);
    let dieuKien = {_id: req.body.UpdateComicID1};

    let duLieu = {
        Name: req.body.UpdateComicName,
        // Logo: nameUpdateLogo,
        Author: req.body.updateAuthor,
        Description: req.body.updateDescription,
        TrangThai: req.body.updateTT,
    };
    comicsModel.updateOne(dieuKien, duLieu, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("sửa thành công");
            console.log(req)
        }

    });
    res.redirect('/comics');
}

exports.postDeleteComics = (req, res, next) => {

    let dieu_kien = {
        _id: req.body.DpInputID
    }

    comicsModel.deleteOne(dieu_kien, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Delete Successful')
        }
    })
    res.redirect('/comics');
}
exports.postDuyetComics = (req, res, next) => {

    let dieu_kien = {
        _id: req.body.idDuyet
    }
    let duLieu= {
        TrangThai: true,
    };
    comicsModel.updateOne(dieu_kien, duLieu, function (err,res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Success");
        }

    });

    res.redirect('/comics_c');
}

exports.getViewComic = async (req, res, next) => {
    console.log(req.params)

    let itemBook = await BookModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
            console.log(err)
        })
    console.log(itemBook)
    if (itemBook == null) {
        res.send('k tim duoc ban gi')
    }
    res.render('./book/edit-book', {itemBook: itemBook})
}
exports.postViewComic = (req, res, next) => {
    console.log(req.body)
    let dieu_kien = {
        _id: req.params.id
    }

    let du_lieu = {
        name: req.body.book_name,
        price: Number(req.body.book_price),
        author: req.body.book_author,
        upload_multer: "http://localhost:3000/uploads/" + req.file.originalname,

    }
    BookModel.updateOne(dieu_kien, du_lieu, function (err, res) {
        if (err) {
            res.send('loi cap nhap' + err.message)
        }
    })
    res.redirect('/book/book-manager')
}

exports.getViewComicChuaDuyet = async (req, res, next) => {
    console.log(req.params)

    let Comic = await comicsModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
            console.log(err)
        })
    console.log(itemBook)
    if (Comic == null) {
        res.send('k tim duoc ban gi')
    }
    res.render('./comics/view', {Comic: Comic})
}
exports.postViewComicChuaDuyet = (req, res, next) => {
    console.log(req.body)
    let dieu_kien = {
        _id: req.params.id
    }

    let du_lieu = {
        name: req.body.book_name,
        price: Number(req.body.book_price),
        author: req.body.book_author,
        upload_multer: "http://localhost:3000/uploads/" + req.file.originalname,

    }
    BookModel.updateOne(dieu_kien, du_lieu, function (err, res) {
        if (err) {
            res.send('loi cap nhap' + err.message)
        }
    })
    res.redirect('/book/book-manager')
}

exports.postSearchComic = async (req, res) => {
    const condition = {
        Name: {
            $regex: req.body.searchComic,
            $options: 'i'
        }
    };
    if (req.body.searchComic=== '') {
        return res.redirect('/comics');
    }
    const searchFind = await comicsModel.find(condition);
    console.log(searchFind);
    if (searchFind.length > 0) {
        return res.render('./comics/comics', {
            comics: searchFind,
            msg: `<h6 class="alert alert-success">Tìm được truyện có tên: ${req.body.searchComic}</h6>`
        });
    } else {
        return res.render('./comics/comics', {
            msg: `<h6 class="alert alert-danger">Không tìm thấy</h6>`
        });
    }
};
exports.postSearchComicChuaDuyet = async (req, res) => {
    const condition = {
        Name: {
            $regex: req.body.searchComic,
            $options: 'i'
        }
    };
    if (req.body.searchComic=== '') {
        return res.redirect('/comics_c');
    }
    const searchFind = await comicsModel.find(condition);
    console.log(searchFind);
    if (searchFind.length > 0) {
        return res.render('./comics/comics-chuaDuyet', {
            comics: searchFind,
            msg: `<h6 class="alert alert-success">Tìm được truyện có tên: ${req.body.searchComic}</h6>`
        });
    } else {
        return res.render('./comics/comics-chuaDuyet', {
            msg: `<h6 class="alert alert-danger">Không tìm thấy</h6>`
        });
    }
};
