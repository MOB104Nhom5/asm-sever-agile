const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
exports.register=(req,res,next)=>{res.render('./user/register')}
exports.postRegister = async (req,res,next)=>{
    if(req.body.password !== req.body.passwordCF){
        return res.render('./user/register.hbs',{msg: '<div class="alert alert-danger" role="alert">\n' +
                'Đăng kí thất bại!Do nhập lại mật khẩu không trùng khớp' +
                '</div>', body: req.body});
    }
    var role= "User";
    const salt = await bcrypt.genSalt(10);
    let objUser = {
        FullName: req.body.FullName,
        Password:await bcrypt.hash(req.body.password, salt) ,
        Email:req.body.Email,
        GT:req.body.radioGT,
        DateOfBirth:req.body.AddDate,
        PhoneNumber:req.body.SDT,
        Role: role,
    }
    // ghi vào CSDL:
    await User.create(objUser,function (err){
        if(err)
            console.log(err)
        else{
            console.log("đăng kí thành công và đã ghi vào db")
        }
    })
    return res.redirect('/login');
}
