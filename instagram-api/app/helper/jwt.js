const jwt = require("jsonwebtoken");
const secret_key = process.env.ACCESS_TOKEN_SECRET;

getAuthToken = async (data) => {
  return jwt.sign(data, secret_key, {
    expiresIn: 8760, // 1 hours
  });
};

decodeAuthToken = async (token) => {
  if (token) {
    try {
      return jwt.verify(token, secret_key);
    } catch (error) {
      return false;
    }
  }
  return false;
};

validAuthToken = async (token) => {
  if (token) {
    try {
      return jwt.verify(token, secret_key);
    } catch (error) {
      return error;
    }
  }
  return false;
};

module.exports = {
  getAuthToken,
  validAuthToken,
  decodeAuthToken,
};
