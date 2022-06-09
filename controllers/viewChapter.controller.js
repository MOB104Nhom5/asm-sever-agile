const comicsModel = require("../models/comics.models")
const chaptersModel = require("../models/chapter.models")
const {resolve} = require("path");
const fs = require("fs");
exports.getViewChapter = async (req, res, next) => {
    let comic = await comicsModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
            console.log(err)
        })
    const chapters = await chaptersModel.find({idComic: comic._id});
     var lengthchapter= chapters.length +1;
    return res.render('./comics/viewChapter', {comic: comic,chapters: chapters,lengthchapter:lengthchapter})
}
exports.postAddChapter = async (req, res, next) => {
    let idComic = req.params.id
    const chapterList = await chaptersModel.find({idChapter: idComic});
    const objChapter = new chaptersModel({
        NumberOfChapter: req.body.NumberOfChapter,
        NameOfChapter: req.body.NameOfChapter,
        Content: req.body.Content,
        idComic: idComic,
    });
    await objChapter.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Thêm thành công");

        }
    });
    res.redirect('/comics/view/'+idComic);
}
exports.postDeleteChapter = (req, res, next) => {
    let idComic = req.params.id

    console.log(req.body.DlID)
    let dieu_kien = {
        _id: req.body.DlID
    }

    chaptersModel.deleteOne(dieu_kien, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Xóa chapter thành công')
        }
    })
    res.redirect('/comics/view/'+idComic);
}
exports.postUpdateChapter = async (req, res, next) => {
    let idComic = req.params.id

    let dieuKien = {_id: req.body.UpdateID};

    let duLieu = {
        NumberOfChapter: req.body.UpdateNumberOfChapter,
        NameOfChapter: req.body.UpdateNameOfChapter,
        Content: req.body.UpdateContent,
    };
    chaptersModel.updateOne(dieuKien, duLieu, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("sửa thành công");
            console.log(req)
        }

    });
    res.redirect('/comics/view/'+idComic);
}
exports.postSearchChapter = async (req, res) => {
    let idComic = req.params.id
    let comic = await comicsModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
            console.log(err)
        })
    const condition = {
        NumberOfChapter: {
            $regex: req.body.searchChapter,
            $options: 'i'
        }
    };
    if (req.body.searchChapter=== '') {
        return res.redirect('/comics/view/'+idComic);
    }
    const searchFind = await chaptersModel.find(condition);
    if (searchFind.length > 0) {
        return res.render('./comics/viewChapter', {
            chapters: searchFind,
            msg: `<h6 class="alert alert-success">Tìm được chương số: ${req.body.searchChapter}</h6>`,
            comic: comic
        });
    } else {
        return res.render('./comics/viewChapter', {
            msg: `<h6 class="alert alert-danger">Không tìm thấy</h6>`
        });
    }
};
// chưa duyệt

exports.getViewChapterChuaDuyet = async (req, res, next) => {
    let comic = await comicsModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
            console.log(err)
        })
    const chapters = await chaptersModel.find({_id: req.params.id});
    var lengthchapter= chapters.length +1;
    return res.render('./comics/viewChapterChuaDuyet', {comic: comic,chapters: chapters,lengthchapter:lengthchapter})
}
exports.postAddChapterChuaDuyet = async (req, res, next) => {
    let idComic = req.params.id
    const chapterList = await chaptersModel.find({idChapter: idComic});
    const objChapter = new chaptersModel({
        NumberOfChapter: req.body.NumberOfChapter,
        NameOfChapter: req.body.NameOfChapter,
        Content: req.body.Content,
        idComic: idComic,
    });
    await objChapter.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Thêm thành công");

        }
    });
    res.redirect('/comics_c/view/'+idComic);
}
exports.postDeleteChapterChuaDuyet = (req, res, next) => {
    let idComic = req.params.id

    console.log(req.body.DlID)
    let dieu_kien = {
        _id: req.body.DlID
    }

    chaptersModel.deleteOne(dieu_kien, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Xóa chapter thành công')
        }
    })
    res.redirect('/comics_c/view/'+idComic);
}
exports.postUpdateChapterChuaDuyet = async (req, res, next) => {
    let idComic = req.params.id

    let dieuKien = {_id: req.body.UpdateID};

    let duLieu = {
        NumberOfChapter: req.body.UpdateNumberOfChapter,
        NameOfChapter: req.body.UpdateNameOfChapter,
        Content: req.body.UpdateContent,
    };
    chaptersModel.updateOne(dieuKien, duLieu, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("sửa thành công");
            console.log(req)
        }

    });
    res.redirect('/comics_c/view/'+idComic);
}
exports.postSearchChapterChuaDuyet = async (req, res) => {
    let idComic = req.params.id
    let comic = await comicsModel.findById(req.params.id)
        .exec()
        .catch(function (err) {
            console.log(err)
        })
    const condition = {
        NumberOfChapter: {
            $regex: req.body.searchChapter,
            $options: 'i'
        }
    };
    if (req.body.searchChapter=== '') {
        return res.redirect('/comics/view/'+idComic);
    }
    const searchFind = await chaptersModel.find(condition);
    if (searchFind.length > 0) {
        return res.render('./comics/viewChapterChuaDuyet', {
            chapters: searchFind,
            msg: `<h6 class="alert alert-success">Tìm được chương số: ${req.body.searchChapter}</h6>`,
            comic: comic
        });
    } else {
        return res.render('./comics/viewChapterChuaDuyet', {
            msg: `<h6 class="alert alert-danger">Không tìm thấy</h6>`
        });
    }
};
