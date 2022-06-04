const bcrypt = require("bcrypt");
const UserModel = require("../models/user.models");
const {resolve} = require("path");
const fs = require("fs");
const comicsModel = require("../models/comics.models");
const User = require("../models/user.models");
exports.getUserList= async (req,res,next)=>{
    const listUser = await UserModel.find({});
    res.render('./user/user', {user :listUser})
}
exports.postAddUser = async (req,res,next)=>{
    const listUser = await UserModel.find({});
    let role = req.body.AddRole;
    const imageDirPath = resolve(__dirname, '../tmp');
    const files = fs.readdirSync(imageDirPath);
    var newNameDir = req.body.FullName.toLowerCase().replace(" ", "_")
    var dir = './public/uploads/' + newNameDir;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);

    } else {
        console.log("Directory already exist");
    }
    fs.rename(
        req.file.destination + req.file.filename,
        './public/uploads/' + newNameDir + '/' + "avatar_" + newNameDir + ".png",
        err => console.log(err)
    );
    let linkAvatar = "/uploads/" + newNameDir +'/' + "avatar_" + newNameDir + ".png";

    let dateOfBirth = req.body.AddDate;
    const salt = await bcrypt.genSalt(10);
    if(req.body.Password !== req.body.CPassword){
        return res.render('./user/user',{msg:'<div class="alert alert-danger" role="alert">\n' +
                ' Thêm thất bại! Do nhập lại mật khaảu không trùng khớp' +
                '</div>', body: req.body,user :listUser});
    }
    const objUser = new UserModel({
        FullName: req.body.FullName,
        Email: req.body.Email,
        Password: await bcrypt.hash(req.body.Password,salt),
        Role: role,
        DateOfBirth:dateOfBirth,
        Avatar:linkAvatar,
        GT:req.body.radioGT,
        PhoneNumber:req.body.SDT,
    });
    await objUser.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Thêm thành công!");
        }
    });
    res.redirect('/user');
}
exports.postUpdateUser = async (req,res,next)=>{

    let dieuKien = {_id: req.body.UpdateID};
    const role = req.body.UpdateRole;
    const salt = await bcrypt.genSalt(10);
    let duLieu= {
        FullName: req.body.UpdateFullName,
        Email: req.body.UpdateEmail,
        Role: role,
        DateOfBirth:req.body.UpdateDate,
        GT:req.body.UpdateRadioGT,
        PhoneNumber:req.body.UpdateSDT,
    };
    UserModel.updateOne(dieuKien, duLieu, function (err,res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Success");
        }

    });
    res.redirect('/user');
}
exports.postUpdatePass = async (req,res,next)=>{
    const listUser = await UserModel.find({});
    const user = await User.findOne({ID: req.body.RePassID});
    let dieuKien = {_id: req.body.RePassID};
    const salt = await bcrypt.genSalt(10);
    const isMatch = await bcrypt.compare(req.body.OldPass, user.Password);
    console.log(isMatch);
    if(!isMatch){
        return res.render('./user/user',{msg:'<div class="alert alert-danger" role="alert">\n' +
                ' Đổi mật khẩu thất bại! Do mật cũ không đúng' +
                '</div>', body: req.body,user :listUser});
    }else if (req.body.NewPassword != req.body.CFNewPass) {
        return res.render('./user/user', {
            msg: '<div class="alert alert-danger" role="alert">\n' +
                ' Đổi mật khẩu thất bại! Do nhập lại mật khẩu không đúng' +
                '</div>', body: req.body, user: listUser
        });
    }
    let duLieu= { Password: await bcrypt.hash(req.body.NewPassword,salt) };
    UserModel.updateOne(dieuKien, duLieu, function (err,res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Success");
        }
    });
    res.redirect('/user');
}
exports.postDeleteUser = (req, res, next)=>{

    let dieu_kien = {
        _id : req.body.DpInputID
    }

    UserModel.deleteOne(dieu_kien, function (err){
        if(err)
        {
            console.log(err)
        }else
        {
            console.log('xóa thành công')
        }
    })
    res.redirect('/user');
    res.writeHead(301, {
        Location: "http://" + req.headers["host"] + "/user"
    });
}
exports.postSearch = async (req, res) => {
    const condition = {
        FullName: {
            $regex: req.body.searchUser,
            $options: 'i'
        }
    };
    if (req.body.searchUser=== '') {
        return res.redirect('/user');
    }
    const searchFind = await UserModel.find(condition);
    console.log(searchFind);
    if (searchFind.length > 0) {
        return res.render('./user/user', {
            user: searchFind,
            msg: `<h6 class="alert alert-success">Tìm được người dùng có tên: ${req.body.searchUser}</h6>`
        });
    } else {
        return res.render('./user/user', {
            msg: `<h6 class="alert alert-danger">Không tìm thấy</h6>`
        });
    }
};





