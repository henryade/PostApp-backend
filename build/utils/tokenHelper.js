"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _apolloServer = require("apollo-server");

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var JWT_KEY = process.env.JWT_KEY;

var generateToken = function generateToken(_ref) {
  var id = _ref._id,
      email = _ref.email,
      username = _ref.username;
  return (0, _jsonwebtoken.sign)({
    id: id,
    email: email,
    username: username
  }, JWT_KEY, {
    expiresIn: '1h'
  });
};

exports.generateToken = generateToken;

var verifyToken = function verifyToken(_ref2) {
  var req = _ref2.req;
  var authorization = req.headers.authorization;

  if (authorization) {
    var token = authorization.split('Bearer ')[1];

    if (token) {
      try {
        var user = (0, _jsonwebtoken.verify)(token, JWT_KEY);
        return user;
      } catch (error) {
        throw new _apolloServer.AuthenticationError('Invalid/Expired Token');
      }
    }

    throw new Error("Authentication token must be 'Bearer [token]'");
  }

  throw new Error('Authorization header must be provided');
};

exports.verifyToken = verifyToken;
//# sourceMappingURL=tokenHelper.js.map