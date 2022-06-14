const User = require("../models/user.models");

const bcrypt = require("bcryptjs");

exports.login = (req, res, next) => {
    res.render('./user/login')
}
exports.loginPost = async (req, res, next) => {
    const user = await User.findOne({Email: req.body.loginEmail});
    if (user) {
        const validPassword = await bcrypt.compare(req.body.loginpassword, user.Password);
        if (validPassword) {
            if (user.Role === "Admin") {
                req.session.user = user;
                res.redirect('/index');
            } else if (user.Role === "User") {
                return res.render('./user/login', {
                    msg: '<div class="alert alert-danger" role="alert">\n' +
                        ' Tài khoản này không có quyền' +
                        '</div>'
                });
            }
        } else {
            return res.render('./user/login', {
                msg: '<div class="alert alert-danger" role="alert">\n' +
                    ' Sai mật khẩu' +
                    '</div>', body: req.body
            });
        }
    } else {
        return res.render('./user/login', {
            msg: '<div class="alert alert-danger" role="alert">\n' +
                'Không tìm thấy user' +
                '</div>',
        });
    }
}
