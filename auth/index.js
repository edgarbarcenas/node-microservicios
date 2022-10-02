const jwt = require("jsonwebtoken");

const config = require("../config");
const error = require("../utils/error");

const secret = config.jwt.secret;

const sign = (data) => {
  return jwt.sign(JSON.stringify(data), secret);
};

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
};

const getToken = (authorization) => {
  if (!authorization) {
    throw new Error("No viene token");
  }
  if (authorization.indexOf("Bearer ") === -1) {
    throw new Error("Formato invalido");
  }
  let token = authorization.replace("Bearer ", "");
  return token;
};

const verify = (token) => {
  return jwt.verify(token, secret);
};

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    console.log(decoded);
    if (decoded.id !== owner) {
      throw error("No puedes hacer esto", 401);
    }
  },
  logged: (req) => {
    const decoded = decodeHeader(req);
  },
};

module.exports = { sign, check };
