"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.date.to-iso-string");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _bcryptjs = require("bcryptjs");

var _apolloServer = require("apollo-server");

var _models = require("../../models");

var _utils = require("../../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  Mutation: {
    login: function login(parent, _ref) {
      var _ref$loginInput, username, password, _validateLoginInput, errors, valid, user, passwordMatch, token;

      return regeneratorRuntime.async(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref$loginInput = _ref.loginInput, username = _ref$loginInput.username, password = _ref$loginInput.password;
              _validateLoginInput = (0, _utils.validateLoginInput)(username, password), errors = _validateLoginInput.errors, valid = _validateLoginInput.valid;

              if (valid) {
                _context.next = 4;
                break;
              }

              throw new _apolloServer.UserInputError('Errors', {
                errors: errors
              });

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(_models.User.findOne({
                username: username
              }));

            case 6:
              user = _context.sent;

              if (user) {
                _context.next = 10;
                break;
              }

              errors.general = "User Not Found";
              throw new _apolloServer.UserInputError('User Not Found', {
                errors: errors
              });

            case 10:
              _context.next = 12;
              return regeneratorRuntime.awrap((0, _bcryptjs.compare)(password, user.password));

            case 12:
              passwordMatch = _context.sent;

              if (passwordMatch) {
                _context.next = 16;
                break;
              }

              errors.general = "Wrong Credentials";
              throw new _apolloServer.AuthenticationError('Wrong Credentials', {
                errors: errors
              });

            case 16:
              token = (0, _utils.generateToken)(user);
              return _context.abrupt("return", _objectSpread({}, user._doc, {
                id: user._id,
                token: token
              }));

            case 18:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    register: function register(parent, _ref2, context, info) {
      var _ref2$registerInput, username, password, email, confirmPassword, _validateRegisterInpu, errors, valid, user, newUser, res, token;

      return regeneratorRuntime.async(function register$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _ref2$registerInput = _ref2.registerInput, username = _ref2$registerInput.username, password = _ref2$registerInput.password, email = _ref2$registerInput.email, confirmPassword = _ref2$registerInput.confirmPassword;
              _validateRegisterInpu = (0, _utils.validateRegisterInput)(username, email, password, confirmPassword), errors = _validateRegisterInpu.errors, valid = _validateRegisterInpu.valid;

              if (valid) {
                _context2.next = 4;
                break;
              }

              throw new _apolloServer.UserInputError('Errors', {
                errors: errors
              });

            case 4:
              _context2.next = 6;
              return regeneratorRuntime.awrap(_models.User.findOne({
                $or: [{
                  email: email
                }, {
                  username: username
                }]
              }));

            case 6:
              user = _context2.sent;

              if (!user) {
                _context2.next = 13;
                break;
              }

              if (!(user.email === email)) {
                _context2.next = 12;
                break;
              }

              throw new _apolloServer.UserInputError('Email is taken', {
                errors: {
                  email: 'This email is taken'
                }
              });

            case 12:
              throw new _apolloServer.UserInputError('Username is taken', {
                errors: {
                  username: 'This username is taken'
                }
              });

            case 13:
              _context2.next = 15;
              return regeneratorRuntime.awrap((0, _bcryptjs.hash)(password, 12));

            case 15:
              password = _context2.sent;
              newUser = new _models.User({
                email: email,
                username: username,
                password: password,
                createdAt: new Date().toISOString()
              });
              _context2.next = 19;
              return regeneratorRuntime.awrap(newUser.save());

            case 19:
              res = _context2.sent;
              token = (0, _utils.generateToken)(res);
              return _context2.abrupt("return", _objectSpread({}, res._doc, {
                id: res._id,
                token: token
              }));

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=users.js.map