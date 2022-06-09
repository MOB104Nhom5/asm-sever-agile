const comicsModel = require("../models/comics.models");
const User = require("../models/user.models");
const chaptersModel = require("../models/chapter.models")
const bcrypt = require("bcrypt");
//comic
exports.getComicsList = async (req, res, next) => {
    const comicsList = await comicsModel.find({TrangThai : true});
    console.log(comicsList);
    res.send(comicsList);
}

exports.getComic = async (req, res, next) => {
    const comic = await comicsModel.findById(req.params.id);
    const chapters = await chaptersModel.find({idComic: comic._id});

    res.send({comic,chapters});
}
exports.postUpComic = async (req, res, next) => {
    try {
        const comic = new comicsModel(req.body);
        comic.Category = req.body.Category.split(";")
        await comic.save();
        res.status(201).send({ comic});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
exports.postUpComicChapter = async (req, res, next) => {
    try {
        const chaptersModel = new chaptersModel(req.body);
        await chaptersModel.save();
        res.status(201).send({ chaptersModel});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
exports.getComicsListUserUp = async (req, res, next) => {
    const comicsList = await comicsModel.find({IDUserUp: req.params.id});
    console.log(req.params.id);
    res.send(comicsList);
}
// postSearchComic
exports.postSearchComic= async (req, res, next) => {

    try {
        let comicsList= await comicsModel.find({});
        const condition = {
            Name: {
                $regex: req.body.searchComic,
                $options: 'i'
            }
        };
        const searchFind = await comicsModel.find(condition);
        if (searchFind.length > 0) {
            res.send(searchFind);
        }else {
             res.send("Không tìm thấy");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

}
exports.postSearchComicByCategory= async (req, res, next) => {

    try {
        let comicsList= await comicsModel.find({});
        const condition = {
            Category: {
                $regex: req.body.searchComic,
                $options: 'i'
            }
        };
        const searchFind = await comicsModel.find(condition);
        if (searchFind.length > 0) {
            res.send(searchFind);
        }else {
             res.send("Không tìm thấy");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

}

//user
exports.postReg = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const user = new User(req.body);
        user.Password = await bcrypt.hashSync(req.body.Password, salt);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const user = await User.findByCredentials(req.body.Email, req.body.Password);
        if (!user) {
            return res.status(401).send({
                message: "Login failed"
            });
        }
        const token = await user.generateAuthToken();
        res.status(200).send({ user, message: "Login success"});
    } catch (error) {
        res.status(400).send(error);
    }
}
exports.getProfile = (req,res,next)=>{
    res.send(req.user)
}
exports.postEditProfile = async (req,res,next)=>{
    try {
        let dulieu={
            FullName: req.body.FullName,
            UserName: req.body.UserName,
            Email: req.body.Email,
            Role: req.body.Role,
        }
        const user = await User.findByIdAndUpdate(req.body.id, dulieu);
        res.status(200).send({user,msg: "Update success"});
    } catch (error) {
        res.status(400).send(error);
    }
}
exports.postEditPassword = async (req,res,next)=>{
    try {
        const user = await User.findById(req.body.id);
        const isMatch = await bcrypt.compare(req.body.Password, user.Password);
        if(!isMatch){
            return res.status(401).send({
                message: "Password is incorrect"
            });
        }
        const salt = bcrypt.genSaltSync(10);
        user.Password = await bcrypt.hashSync(req.body.NewPassword, salt);
        await user.save();
        res.status(200).send({user,msg: "Update success"});
    } catch (error) {
        res.status(400).send(error);
    }
}
exports.postLogout = async  (req,res,next)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send("Đăng xuất thành công")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}
exports.postLogoutAll = async (req,res,next)=>{
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send("Đăng xuất hết rồi")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
