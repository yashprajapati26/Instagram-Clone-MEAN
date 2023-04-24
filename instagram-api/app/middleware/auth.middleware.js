const { STATUSCODE } = require("../config/constant");
const { decodeAuthToken } = require("../helper/jwt");
const Users = require("../models/users.model");
const authService = require("../services/auth.service");

verifyToken = async (req, res, next) => {
  let token = req.headers["auth_token"];
  if (!token) {
    return res.status(STATUSCODE.unauthorized).json({ msg: "token not found" });
  }
  const decoded = await decodeAuthToken(token);
  if (decoded && decoded.id) {
    req.userId = decoded.id;
    console.log("------------------->>>>", req.userId);
    let user = await authService.findOne(["id", "email"], { id: req.userId });
    if (user) {
      return next();
    } else {
      return res.status(STATUSCODE.unauthorized).json({ msg: "Invalid User" });
    }                                        
  } else {
    return res.status(STATUSCODE.unauthorized).json({ msg: "Invalid Token" });
  }
};

module.exports = { verifyToken };
