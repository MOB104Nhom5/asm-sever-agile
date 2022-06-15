var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../middleware/auth.midllware')

/* GET home page. */
router.get('/',AuthMiddleware.YeuCauDangNhap, function(req, res, next) {
  res.render('index');
});
router.post("/", (req, res) => {
  console.log(req);
  res.writeHead(301, {
    Location: "http://" + req.headers["host"] + "/index",
  });
  res.end();
});
module.exports = router;
